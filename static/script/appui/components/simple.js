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

define(
  'sampleapp/appui/components/simple',
  [
    'antie/widgets/component',
    'antie/widgets/button',
    'antie/widgets/label',
    'antie/widgets/verticallist',
    'antie/widgets/carousel',
    'antie/datasource',
    'sampleapp/appui/formatters/simpleformatter',
    'sampleapp/appui/datasources/fruitdata'
  ],
  function (Component, Button, Label, VerticalList, Carousel, DataSource, SimpleFormatter, FruitData) {
    // All components extend Component
    return Component.extend({
      init: function init () {
        // It is important to call the constructor of the superclass
        init.base.call(this, 'simplecomponent')

        // Add the labels to the component
        var helloWorldLabel = new Label('helloWorldLabel', 'Hello World')
        this.appendChildWidget(helloWorldLabel)

        var welcomeLabel = new Label('welcomeLabel', 'Welcome to your first TAL application!')
        this.appendChildWidget(welcomeLabel)

        // Create a vertical list and append the buttons to navigate within the list
        var verticalListMenu = new VerticalList('mainMenuList')
        verticalListMenu.appendChildWidget(this._createCarouselButton())
        verticalListMenu.appendChildWidget(this._createPlayerButton())
        verticalListMenu.appendChildWidget(this._createGridButton())
        verticalListMenu.appendChildWidget(this._createGridWidgetButton())
        this.appendChildWidget(verticalListMenu)
      },

      _createPlayerButton: function () {
        function playerButtonSelected (evt) {
          this.getCurrentApplication().pushComponent(
            'maincontainer',
            'sampleapp/appui/components/simplevideocomponent'
          )
        }
        var playerButton = new Button()
        playerButton.addEventListener('select', playerButtonSelected.bind(this))
        playerButton.appendChildWidget(new Label('Simple Video Player Example'))
        return playerButton
      },

      _createCarouselButton: function () {
        // this is the most basic carousel example, but shows most features available
        // to the carousels
        // (see: http://bbc.github.io/tal/widgets/carousel.html)
        function carouselExampleSelected () {
          this.getCurrentApplication().pushComponent(
            'maincontainer',
            'sampleapp/appui/components/carouselcomponent',
            {
              description: 'Carousel example, LEFT and RIGHT to navigate, SELECT to go back',
              dataSource: FruitData,
              formatter: new SimpleFormatter(),
              orientation: Carousel.orientations.HORIZONTAL,
              carouselId: 'verticalCullingCarousel',
              animOptions: {
                skipAnim: false
              },
              alignment: {
                normalisedAlignPoint: 0.5,
                normalisedWidgetAlignPoint: 0.5
              },
              initialItem: 4,
              lengths: 264
            }
          )
        }

        var button = new Button('carouselButton')
        button.appendChildWidget(new Label('Carousel Example'))
        button.addEventListener('select', carouselExampleSelected.bind(this))
        return button
      },

      _createGridButton: function () {
        // A question frequently asked is how to create "grids" of carousels
        // and how to use them.
        // There are two ways to use a Component
        // pushed (as shown here)
        // or directly (as shown with components/componentwithscrollinggridwidget.js)
        function carouselExampleSelected () {
          // in this example we push the scrolling grid component
          // directly into the main container.
          this.getCurrentApplication().pushComponent(
            'maincontainer',
            'sampleapp/appui/components/scrollinggrid'
          )
        }

        var button = new Button('gridButton')
        button.appendChildWidget(new Label('Grid Example'))
        button.addEventListener('select', carouselExampleSelected.bind(this))
        return button
      },

      _createGridWidgetButton: function () {
        function carouselExampleSelected () {
          // however down here (in contrast to _createGridButton)
          // we push a component that uses the scrolling grid as a
          // direct child widget
          this.getCurrentApplication().pushComponent(
            'maincontainer',
            'sampleapp/appui/components/componentwithscrollinggridwidget'
          )
        }

        var button = new Button('gridWidgetButton')
        button.appendChildWidget(new Label('Grid As A Widget Example'))
        button.addEventListener('select', carouselExampleSelected.bind(this))
        return button
      }
    })
  }
)
