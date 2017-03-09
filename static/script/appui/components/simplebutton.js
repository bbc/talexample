/**
 * @fileOverview Requirejs module containing the antie.widgets.Button class.
 * @preserve Copyright (c) 2013-present British Broadcasting Corporation. All rights reserved.
 * @license See https://github.com/fmtvp/tal/blob/master/LICENSE for full licence
 */

define(
    'sampleapp/appui/components/simplebutton',
    [
        'antie/widgets/button'
    ],
    function(Button) {
        'use strict';

        return Button.extend({

            init: function(id, animationEnabled) {
                this._super(id, animationEnabled);
                this._blurButton();
            },

            render: function(device) {
                this._super(device);

                // Create 2 backgrounds: one for blur and one for normal, hide the focus background
                this._blurBackground = device._createElement('div', this.id + "_blur", ["simpleButtonBackground"]);
                this._focusBackground = device._createElement('div', this.id + "_focus", ["simpleButtonFocussedBackground"]);
                this._focusBackground.style.opacity = 0;
                this.outputElement.insertBefore(this._blurBackground, this.outputElement.firstChild);
                this.outputElement.insertBefore(this._focusBackground, this.outputElement.firstChild);

                return this.outputElement;
            },

            _setActiveChildFocussed: function(focus) {
                this._super(focus);
                if(focus) {
                    this._focusButton();
                } else {
                    this._blurButton();
                }
            },

            removeFocus: function() {
                this._super();
                this._blurButton();
            },

            _focusButton: function() {
                // on focus, show focus and hide blur backgrounds
                if (this._focusBackground === undefined)
                  return;
                this._focusBackground.style.opacity = 1;
                this._blurBackground.style.opacity = 0;
            },
            _blurButton: function() {
                // on blur, show blur and hide focus backgrounds
                if (this._focusBackground === undefined)
                  return;
                this._focusBackground.style.opacity = 0;
                this._blurBackground.style.opacity = 1;
            }
        });
    }
);
