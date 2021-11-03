/*
Copyright (C) 2021  DCN Consulting Ltd (incorporated in Ireland)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3,
as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// compiler.js does a webpack pass on the given entrypoint using the webpack api (v4 atm).
// The pass is configured with loader.js defined to load calculang files (containing .cul).
// The purpose of the pass is to collect introspection information (calculang relationships) so that via graph logic
// we can determine inputs relevant to each calculang function.
// This is determined below using a graphlib Graph/s and results are stored in (also relationship inputs read from) global_state.
// webpack 'stats' object is returned/resolved below, but it doesn't actually matter: the useful output from this step is accessed by the outside world via global_state

import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

import global_state from './global_state.js';

import { Graph } from 'graphlib';
import { alg } from 'graphlib';
import dot from 'graphlib-dot';

export default (entrypoint, options = {}) => {
  var use_config = [
    {
      loader: path.resolve(__dirname, './loader.js'),
      options: { ...options, outputLocation: '' },
    },
  ];
  if (options.memo)
    // this is opt-in atm
    use_config.push({
      loader: path.resolve(__dirname, './memoloader.js'),
      options,
    });

  const compiler = webpack({
    context: __dirname,
    entry: `${path.resolve(entrypoint)}`,
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
      libraryTarget: 'commonjs2', // doesn't matter
    },
    optimization: {
      minimize: false,
      //runtimeChunk: true, results in a 0.bundle.js without bootstrap, just model code bundled as jsonP
    },
    module: {
      rules: [
        {
          test: /\.cul/,
          use: use_config,
        },
        {
          test: /\.sl/, // this was an earlier development extension (seed-lang!), but keeping configured, because I still want to run my .sl files for a little while
          use: use_config,
        },
      ],
    },
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume()); // will it be better to use disk directly?
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    // note on webpack api:
    // from https://v4.webpack.js.org/api/node/:
    // "The API only supports a single concurrent compilation at a time. When using run, wait for it to finish before calling run or watch again. When using watch, call close and wait for it to finish before calling run or watch again. Concurrent compilations will corrupt the output files."
    // this is why tests are --runInBand (=> run in sequence, not in parallel)

    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      debugger;

      // can I do import all logic here, and namespaces?
      // import all logic should import all things, ignoring? overwritten stuff (not explicitally exported?)

      // simple as: for all name='all' and reason='explicit import' in cul_functions
      // => loop all defns in cul_source_scope_id and create as though explicit imports. Delete 'all'
      // OK but "for all name=..." needs to be depth-first.. does it need to aff. all parents?

      // or calculate an order for all replacement in first pass... work backwards. simple implementation (no sep. tree needed)

      // 2 graphs, with edge directions reversed
      var g = new Graph({ multigraph: true });
      var g1 = new Graph({ multigraph: true });

      // create nodes: node for each cul_definition
      global_state.cul_functions.forEach((value, key) => {
        g.setNode(key, { ...value, label: `${key}` });
        g1.setNode(key, { ...value, label: `${key}` });
      });

      // set edges
      global_state.cul_links.forEach((value) => {
        if (!global_state.cul_functions.has(value.from)) return; // Array.push({}) has in cul_links as 0_undefined
        g.setEdge(value.from, value.to, {
          value,
          label:
            value.reason +
            (value.negs ? ' -' + value.negs.toString() : '') +
            (value.reason == 'input'
              ? ' +' + global_state.cul_functions.get(value.from).name
              : ''),
        });
        g1.setEdge(value.to, value.from, {
          value,
          label:
            value.reason +
            (value.negs ? ' -' + value.negs.toString() : '') +
            (value.reason == 'input'
              ? ' +' + global_state.cul_functions.get(value.from).name
              : ''),
        });
      });

      global_state.cul_functions.forEach((value, key) => {
        g.setNode(key, {
          ...value,
          //label: `${key} inputs: ${value.inputs.toString()}`,
        });
        g1.setNode(key, {
          ...value,
          //label: `${key} inputs: ${value.inputs.toString()}`,
        });
      });

      /*alg.postorder(g1, g.nodes()); // this ordering (on g1) ensures all inputs ordered before each node (all nodes included)
      alg.postorder(g1, g.nodes()).map((d) => ({
        d,
        ss: g1.successors(d).toString(),
      }));*/

      [...global_state.cul_functions.entries()]
        //.filter(([k, d]) => d.reason != 'input definition')
        .forEach(([k, d]) => {
          var a = alg;
          global_state.cul_input_map.set(
            k,
            new Set(
              alg
                .postorder(g1, k)
                .filter((d) => g.node(d)?.reason == 'input definition') // non JS has no reason e.g. reporting Table, but get excluded. Could lookup cul_functions)
                .map((d) => g.node(d).name)
            )
          );
        });

      // e.g. price_my_fave_product = () => price({product_in:'mate'}), while another call to price might indicate a dependence on product, this particular call doesn't, and *without any other calls* then price_my_fave_product should not be dependent on product
      // I call this a 'neg' in terms of the call. Logic below figures about dependence impacts via graph logic
      // cul_input_map updated directly below
      var edges_with_negs = g
        .edges()
        .map((d) => g.edge(d))
        .filter((d) => d.value.negs?.length > 0);

      edges_with_negs.forEach((edge) => {
        edge.value.negs.forEach((neg_in) => {
          var other_edges = g
            .inEdges(edge.value.to)
            .map((d) => g.edge(d))
            .filter((d) => JSON.stringify(d) != JSON.stringify(edge)); // filter out edge
          // can this forEach() be an every() with a break when a neg is needed? Also s.t. better than stringify?
          alg.preorder(g, edge.value.to).forEach((d) => {
            other_edges = g
              .inEdges(d)
              .map((d) => g.edge(d))
              .filter((d) => JSON.stringify(d) != JSON.stringify(edge))
              .filter((d) => !d.value.negs?.includes(neg_in));

            //(gg.inEdges(d).map(d => g.edge(d))

            //if (gg.inEdges(d).filter(d => g.edge(d).value.reason == 'call').map(d => g.edge(d).value.negs).reduce((a,v) => ([...a,...v]), []).includes(neg_in))
            // does another path include the neg_in?

            var result = g
              .successors(d)
              .filter(
                (d) => d != edge.value.from /* filter out the negged one */
              )
              .map((d) => global_state.cul_input_map.get(d))
              .reduce((a, v) => [...a, ...v], [])
              .includes(neg_in);

            result = other_edges
              .map((d) => global_state.cul_input_map.get(d.value.from))
              .reduce((a, v) => [...a, ...v], [])
              .includes(neg_in);

            if (!result) global_state.cul_input_map.get(d).delete(neg_in);
          });
        });
      });

      // based on cul_input_map, add inputs into cul_functions)
      global_state.cul_functions = new Map(
        [...global_state.cul_functions.entries()].map(([k, v]) => [
          k,
          {
            ...v,
            inputs: global_state.cul_input_map.has(k)
              ? [...global_state.cul_input_map.get(k)]
              : [],
          },
        ])
      );

      // update labels in the graph
      global_state.cul_functions.forEach((value, key) => {
        g.setNode(key, {
          ...value,
          label: `${key} inputs: ${value.inputs.toString()}`,
        });
        g1.setNode(key, {
          ...value,
          label: `${key} inputs: ${value.inputs.toString()}`,
        });
      });

      // put dot description of graph into global_state
      global_state.dot = dot.write(g);

      // return/resolve stats, but not used (global_state the key output)

      resolve(stats);
    });
  });
};
