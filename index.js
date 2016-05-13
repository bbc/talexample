/**
 * The entry point for TAL based applications using node.js
 *
 * @copyright Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

var express = require('express');
var app = express();
var AntieFramework = require('tal');
var mustacheExpress = require('mustache-express');

// Setup mustache for view templating
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {

  // Path to device configuration directory
  var configPath = "node_modules/tal/config";
  var antie = new AntieFramework(configPath);

  // Get normalised brand and model from url parameters
  var device_brand = antie.normaliseKeyNames(req.query.brand || "default");
  var device_model = antie.normaliseKeyNames(req.query.model || "webkit");

  // Load framework device config files, named BRAND-MODEL-default.json
  var device_configuration;

  try {
    device_configuration = antie.getConfigurationFromFilesystem(device_brand + "-" + device_model + "-default", "/devices");
  } catch(e) {
    res.status(406).render('error', {
      exception: e
    });

    return;
  }

  // Substitute application_id wherever /%application%/ token is present in device configuration
  var application_id = "sampleapp";
  device_configuration = device_configuration.replace(/%application%/g, application_id);

  var device_configuration_decoded = JSON.parse(device_configuration);

  res.render('index', {
    root_html_tag: antie.getRootHtmlTag(device_configuration_decoded),
    headers: antie.getDeviceHeaders(device_configuration_decoded),
    application_id: application_id,
    device_configuration: device_configuration,
    extra_body: antie.getDeviceBody(device_configuration_decoded)
  });
});

app.use('/tal', express.static('node_modules/tal'));
app.use('/static', express.static('static'));

app.listen(1337, function () {
  console.log('Example app listening on port 1337');
});
