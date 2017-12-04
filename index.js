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

var express = require('express')
var app = express()
var AntieFramework = require('tal')
var mustacheExpress = require('mustache-express')
var path = require('path')

// Setup mustache for view templating
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, '/views'))

app.get('/', function (req, res) {
  // Path to device configuration directory
  var configPath = 'node_modules/tal/config'
  var antie = new AntieFramework(configPath)

  // Get normalised brand and model from url parameters
  var deviceBrand = antie.normaliseKeyNames(req.query.brand || 'default')
  var deviceModel = antie.normaliseKeyNames(req.query.model || 'webkit')

  // Load framework device config files, named BRAND-MODEL-default.json
  var deviceConfiguration

  try {
    deviceConfiguration = antie.getConfigurationFromFilesystem(deviceBrand + '-' + deviceModel + '-default', '/devices')
  } catch (e) {
    res.status(406).render('error', {
      exception: e
    })

    return
  }

  // Substitute application_id wherever /%application%/ token is present in device configuration
  var applicationId = 'sampleapp'
  deviceConfiguration = deviceConfiguration.replace(/%application%/g, applicationId)

  var deviceConfigurationDecoded = JSON.parse(deviceConfiguration)

  res.render('index', {
    root_html_tag: antie.getRootHtmlTag(deviceConfigurationDecoded),
    headers: antie.getDeviceHeaders(deviceConfigurationDecoded),
    application_id: applicationId,
    device_configuration: deviceConfiguration,
    extra_body: antie.getDeviceBody(deviceConfigurationDecoded)
  })
})

app.use('/tal', express.static('node_modules/tal'))
app.use('/static', express.static('static'))

app.listen(1337, function () {
  console.log('Example app listening on port 1337')
})
