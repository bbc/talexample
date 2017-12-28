define(
  'sampleapp/appui/formatters/scrollinggridrowformatter',
  [
    'antie/widgets/carousel',
    'antie/widgets/carousel/binder',
    'antie/widgets/carousel/keyhandlers/activatefirsthandler',
    'sampleapp/appui/formatters/simpleformatter'
  ],
  function (Carousel, Binder, ActivateFirstHandler, SimpleFormatter, SimpleFeed) {
    return function ScrollingGridRowFormatter () {
      return {
        format: function (iterator) {
          var next = iterator.next()
          var row = new Carousel('horizontalRow' + next.id, Carousel.orientations.HORIZONTAL)
          var binder = new Binder(new SimpleFormatter(), next.feed)
          binder.appendAllTo(row)

          var handler = new ActivateFirstHandler()
          handler.setAnimationOptions({skipAnim: false})
          handler.attach(row)
          return row
        }
      }
    }
  }
)
