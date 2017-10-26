/**
* @preserve Copyright (c) 2014 British Broadcasting Corporation
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

define(
  "sampleapp/appui/components/horizontalprogresscomponent",
  [
    "antie/widgets/component",
    "antie/widgets/horizontalprogress",
    "antie/widgets/label",
    "antie/widgets/button"
  ],
  function (Component, HorizontalProgress, Label, Button) {

    return Component.extend({
      init: function init () {
        init.base.call(this, "horizontalprogresscomponent");

        var button = new Button();
        button.appendChildWidget(new Label("Press SELECT to return to main menu."));
        this.appendChildWidget(button);

        this._progress = new HorizontalProgress("progressBar", true, 0);
        this._progress.setText("My Progress Bar!");
        this.appendChildWidget(this._progress);

        var self = this;

        this.addEventListener("aftershow", function (evt) {
          self._onAfterShow(evt);
        });

        this.addEventListener("beforehide", function (evt) {
          self._onBeforeHide(evt);
        });

        this.addEventListener("select", function(evt) {
          self.parentWidget.back();
        });
      },

      _onAfterShow: function () {
        this._progress.setValue(0.0);
        var self = this;

        this._intervalID = setInterval( function() {
          var value = self._progress.getValue() + 0.1;

          if (value > 1.0) {
            value = 1.0;
          }

          self._progress.setValue(value);
        }, 1000);
      },

      _onBeforeHide: function () {
        clearInterval(this._intervalID);
      }
    });

  }
);
