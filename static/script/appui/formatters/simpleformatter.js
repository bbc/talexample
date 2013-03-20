require.def("sampleapp/appui/formatters/simpleformatter",
    [
        "antie/formatter",
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/widgets/image"
    ],
    function(Formatter, Label, Button, Image) {
        return Formatter.extend({
            format : function (iterator) {
                var button, item;
                item = iterator.next();
                button = new Button("fruit" + item.id);
                button.appendChildWidget(new Image("img-item.id", item.img, { width : 200, height: 200}));
                button.appendChildWidget(new Label(item.title));
                return button;
            }
        });
    }
);