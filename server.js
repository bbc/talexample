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
var tal = require('tal');
var join = require('path').join;

/*
 Configuration
 */
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.engine('ejs', require('consolidate').ejs);

app.use('/static', express.static(join(__dirname, 'static')));
app.use('/antie', express.static(join(__dirname, 'node_modules', 'tal-components')));

/*
 Routes
 */
app.get('/', tal.middleware({ application_id: 'sampleapp' }), function(req, res){
  res.render('index', {});
});

app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');