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
  "sampleapp/appui/components/simplevideocomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/horizontallist",
    "antie/videosource",
    "antie/devices/mediaplayer/mediaplayer",
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, HorizontalList, VideoSource, MediaPlayer, RuntimeContext) {

    return Component.extend({
      init: function init () {
        var self = this;

        // It is important to call the constructor of the superclass
        init.base.call(this, "simplevideocomponent");

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
          self.getPlayer().resume();
        });

        var pause = new Button('pause');
        pause.appendChildWidget(new Label('PAUSE'));
        playerControlButtons.appendChildWidget(pause);
        pause.addEventListener('select', function(evt) {
          self.getPlayer().pause();
        });

        var rewind = new Button('rewind');
        rewind.appendChildWidget(new Label('-5s'));
        playerControlButtons.appendChildWidget(rewind);
        rewind.addEventListener('select', function(evt) {
          var currentTime = self.getPlayer().getCurrentTime();
          self.getPlayer().playFrom(currentTime - 5);
        });

        var fastForward = new Button('fastForward');
        fastForward.appendChildWidget(new Label('+5s'));
        playerControlButtons.appendChildWidget(fastForward);
        fastForward.addEventListener('select', function(evt) {
          var currentTime = self.getPlayer().getCurrentTime();
          self.getPlayer().playFrom(currentTime + 5);
        });

        var back = new Button('back');
        back.appendChildWidget(new Label('BACK'));
        playerControlButtons.appendChildWidget(back);
        back.addEventListener('select', function(evt) {
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
        // Create the device's video object, set the media sources and start loading the media
        var videoContainer = RuntimeContext.getCurrentApplication().getRootWidget().outputElement;
        var player = this.getPlayer()
        player.initialiseMedia('video', "static/mp4/spinning-logo.mp4", "video/mp4", videoContainer);
        player.beginPlayback();
      },

      getPlayer: function() {
        return RuntimeContext.getDevice().getMediaPlayer();
      },

      destroyPlayer: function() {
        this.getPlayer().stop();
        this.getPlayer().reset();
      },

      showBackground: function() {
        if (this._device.getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
          this._device.removeClassFromElement(document.body, 'background-none');
          this._application.getRootWidget().removeClass('background-none');
        }
      }
    });
  }
);
