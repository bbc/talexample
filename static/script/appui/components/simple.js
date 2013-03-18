require.def("sampleapp/appui/components/simple",
    [
        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label"
    ],
    function (Component, Button, Label) {
        
        // All components extend Component
        return Component.extend({
            init: function () {
                var self, label, button;

                self = this;
                // It is important to call the constructor of the superclass
                this._super("simplecomponent");
                
                // Hello World
                label = new Label("Hello World");
                this._button = new Button();
                this._button.appendChildWidget(label);
                
                this.addEventListener("beforerender", function (ev) {
                    self._onBeforeRender(ev);
                });

                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady() {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function () {
                this.appendChildWidget(this._button);
            } 
        });
    }
);