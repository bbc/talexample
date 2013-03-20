require.def("sampleapp/appui/components/simple",
    [
        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist"
    ],
    function (Component, Button, Label, VerticalList) {
        
        // All components extend Component
        return Component.extend({
            init: function () {
                var self, helloWorldLabel, welcomeLabel, carouselButtonLabel, verticalListMenu;

                self = this;
                // It is important to call the constructor of the superclass
                this._super("simplecomponent");

                // Add the labels to the component
                helloWorldLabel = new Label("helloWorldLabel", "Hello World");
                this.appendChildWidget(helloWorldLabel);

                welcomeLabel = new Label("welcomeLabel", "Welcome to your first TAL application!");
                this.appendChildWidget(welcomeLabel);

                // Create the buttons and add select event listeners
                var carouselButton = new Button();
                carouselButton.addEventListener("select", function(evt){
                    self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simplecarouselcomponent");
                });
                carouselButtonLabel = new Label("Simple Carousel Example");
                carouselButton.appendChildWidget(carouselButtonLabel);

                var playerButton = new Button();
                playerButton.addEventListener("select", function(evt){
                    self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simplevideocomponent");
                });
                playerButton.appendChildWidget(new Label("Simple Video Player Example"));

                // Create a vertical list and append the buttons to navigate within the list
                verticalListMenu = new VerticalList("mainMenuList");
                verticalListMenu.appendChildWidget(carouselButton);
                verticalListMenu.appendChildWidget(playerButton);
                this.appendChildWidget(verticalListMenu);

                // Add a 'beforerender' event listener to the component to do anything specific that might need to be done
                // before rendering the component
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function () {


            } 
        });
    }
);