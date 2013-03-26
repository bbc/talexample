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

require.def("sampleapp/appui/components/simplevideocomponent",
    [
        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/horizontallist",
        "antie/videosource",
        "antie/widgets/media"
    ],
    function (Component, Button, Label, HorizontalList, VideoSource, Media) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self = this;

                // It is important to call the constructor of the superclass
                this._super("simplevideocomponent");

                // Get a reference to the current application and device objects
                this._application = this.getCurrentApplication();
                this._device = this._application.getDevice();

                // Create a a label add a class to it, this class can be used as a CSS selector
                var description = new Label("Simple Video Component.");
                description.addClass("description");
                this.appendChildWidget(description);

                // Create a horizontal list that contains buttons to control the video
                var playerControlButtons = new HorizontalList("playerButtons");

                var play = new Button('play');
                play.appendChildWidget(new Label('PLAY'));
                playerControlButtons.appendChildWidget(play);
                play.addEventListener('select', function(evt) {
                    self.getPlayer().play();
                });

                var pause = new Button('pause');
                pause.appendChildWidget(new Label('PAUSE'));
                playerControlButtons.appendChildWidget(pause);
                pause.addEventListener('select', function(evt) {
                    self.getPlayer().pause();
                });

                var back = new Button('back');
                back.appendChildWidget(new Label('BACK'));
                playerControlButtons.appendChildWidget(back);
                back.addEventListener('select', function(evt) {
                    if (self._device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
                        self.showBackground();
                    }

                    // Make sure we destroy the player before exiting
                    self.destroyPlayer();
                    self.parentWidget.back();
                });

                // Append the player control buttons to the component
                this.appendChildWidget(playerControlButtons);

                // Add a 'beforerender' event listener to the component that takes care of video instantiation
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });
            },

            _onBeforeRender: function (ev) {
                // Create a video player
                var videoUrl = "static/mp4/spinning-logo.mp4";
                var videoType = "video/mp4";

                // Create the device's video object, set the media sources and start loading the media
                var player = this.createVideoPlayer();
                player.setSources([new VideoSource(videoUrl, videoType)]);
                player.load();
            },
            getPlayer : function() {
                return this._player;
            },
            destroyPlayer : function() {
                this._player.destroy();
                this.removeChildWidget(this._player);
                this._player = null;
            },
            createVideoPlayer: function() {
                var self = this;

                // Create the player and append it to the component
                this._player = this._device.createPlayer('testPlayer', 'video');
                this.appendChildWidget(this._player);

                // Start playing the video as soon as the device fires an antie 'canplay' event
                this._player.addEventListener('canplay', function(evt) {
                    // Some devices have the player in the background behind the HTML page, we need to ensure the
                    // document body is transparent in order to see the video content
                    if (self._device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
                        self.hideBackground();
                    }

                    // Start playing the media
                    self._player.play();
                });

                // Return a reference to the player object so we can set and load the media source
                return this._player;
            },
            hideBackground : function() {
                this._device.addClassToElement(document.body, 'background-none');
                this._application.getRootWidget().addClass('background-none');
            },
            showBackground : function() {
                if (this._device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
                    this._device.removeClassFromElement(document.body, 'background-none');
                    this._application.getRootWidget().removeClass('background-none');
                }
            }
        });
    }
);
