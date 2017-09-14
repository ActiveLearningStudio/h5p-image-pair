(function (ImagePair, $) {

  /**
   * A dialog for reading the description of a card.
   *
   * @class H5P.ImagePair.Popup
   * @param {H5P.jQuery} $container
   * @param {Object.<string, string>} l10n
   */
  ImagePair.Popup = function ($container, l10n) {
    /** @alias H5P.ImagePair.Popup# */
    var self = this;

    var closed;

    var $popup = $('<div class="h5p-image-pop"><div class="h5p-image-top"></div><div class="h5p-image-desc"></div><div class="h5p-image-close" role="button" tabindex="0" title="' + (l10n.closeLabel || 'Close') + '"></div></div>').appendTo($container);
    var $desc = $popup.find('.h5p-image-desc');
    var $top = $popup.find('.h5p-image-top');

    // Hook up the close button
    $popup.find('.h5p-image-close').on('click', function () {
      self.close();
    }).on('keypress', function (event) {
      if (event.which === 13 || event.which === 32) {
        self.close();
        event.preventDefault();
      }
    });

    /**
     * Show the popup.
     *
     * @param {string} desc
     * @param {H5P.jQuery[]} imgs
     * @param {function} done
     */
    self.show = function (desc, imgs, styles, done) {
      $desc.html(desc);
      $top.html('').toggleClass('h5p-image-two-images', imgs.length > 1);
      for (var i = 0; i < imgs.length; i++) {
        $('<div class="h5p-image-image"' + (styles ? styles : '') + '></div>').append(imgs[i]).appendTo($top);
      }
      $popup.show();
      closed = done;
    };

    /**
     * Close the popup.
     */
    self.close = function () {
      if (closed !== undefined) {
        $popup.hide();
        closed();
        closed = undefined;
      }
    };

    /**
     * Sets popup size relative to the card size
     * @param {number} fontSize
     */
    self.setSize = function (fontSize) {
      // Set image size
      $top[0].style.fontSize = fontSize + 'px';

      // Determine card size
      var cardSize = fontSize * 6.25; // From CSS

      // Set popup size
      $popup[0].style.minWidth = (cardSize * 2.5) + 'px';
      $popup[0].style.minHeight = cardSize + 'px';
    };
  };

})(H5P.ImagePair, H5P.jQuery);
