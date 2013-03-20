/**
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
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

require.def("sampleapp/appui/components/simplecarouselcomponent",
    [
        "antie/widgets/component",
        "antie/datasource",
        "antie/widgets/horizontalcarousel",
        "sampleapp/appui/formatters/simpleformatter",
        "sampleapp/appui/datasources/simplefeed",
        "antie/widgets/label"
    ],
    function (Component, DataSource, HorizontalCarousel, SimpleFormatter, SimpleFeed, Label) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self = this;

                // It is important to call the constructor of the superclass
                this._super("simplecarouselcomponent");

                // Create a a label add a class to it, this class can be used as a CSS selector
                var description = new Label("Press LEFT and RIGHT to navigate, SELECT returns to main menu.");
                description.addClass("description");
                this.appendChildWidget(description);

                // Create a simple formatter and data feed that will be used to populate the carousel
                var simpleFormatter = new SimpleFormatter();
                var sampleFeed = new SimpleFeed()
                this._dataSource = new DataSource(this, sampleFeed, "loadData");

                // Create a new carousel and append it to the component
                this._carousel = new HorizontalCarousel("simplecarousel", simpleFormatter);
                this.appendChildWidget(this._carousel);

                // Add a 'beforerender' event listener to the component to ensure the data is rebinded to the
                // carousel before the component is rendered
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // Add a select event listener to the carousel that pops back to the previous component on the component stack
                this._carousel.addEventListener("select", function(evt){
                    self.parentWidget.back();
                });
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            // TODO: review the above comment, could be missleading
            _onBeforeRender: function () {
                this._carousel.setDataSource(this._dataSource);
            }
        });
    }
);