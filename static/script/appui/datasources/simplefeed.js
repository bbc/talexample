require.def("sampleapp/appui/datasources/simplefeed",
    [
        "antie/class"
    ],
    function(Class) {
        return Class.extend({
            // You will probably want to do something
            // more useful then returning static data.
            // An array of objects is expected.
            loadData : function(callbacks) {
                callbacks.onSuccess(
                    [
                        {
                            "id":"1",
                            "title":"Apple",
                            "img" : "/static/img/fruit/apple.png"
                        },
                        {
                            "id":"2",
                            "title":"Banana",
                            "img" : "/static/img/fruit/banana.png"
                        },
                        {
                            "id":"3",
                            "title":"Grapes",
                            "img" : "/static/img/fruit/grapes.png"
                        },
                        {
                            "id":"4",
                            "title":"Orange",
                            "img" : "/static/img/fruit/orange.png"
                        },
                        {
                            "id":"5",
                            "title":"Peach",
                            "img" : "/static/img/fruit/peach.png"
                        },
                        {
                            "id":"6",
                            "title":"Pear",
                            "img" : "/static/img/fruit/pear.png"
                        }
                    ]
                );
            }
        });
    });