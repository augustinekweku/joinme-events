/* ========================================================================
 * DOM-based Routing
 * ======================================================================== */

(function ($) {
  // Toggle Sidebar
  $(document).on("click", ".navbar-main .topbar__button", function () {
    $("#navbarAsideContent").toggleClass("sidebar--small");
    $("body > .wrapper").toggleClass("wrapper--full-width ");
    $(".modal-backdrop").remove();
    var $div = $('<div />').appendTo('body');
    $div.attr('class', 'modal-backdrop fade d-block d-lg-none show');
  });

  $(document).on("click", ".modal-backdrop", function () {
    $("#navbarAsideContent").toggleClass("sidebar--small");
    $("body > .wrapper").toggleClass("wrapper--full-width ");
    $(this).remove();
  }); 

  $(document).on("click", ".filter-btn", function () {
    $(".filter-form").slideToggle("slow");
    var text = $(".filter-btn span").text();
    $(".filter-btn span").text(
      text == "Hide Filter" ? "Show Filter" : "Hide Filter"
    );
  });

  // move to another input box after maxLength is hit on verification
  $(".tel_num").keyup(function () {
    if (this.value.length === this.maxLength) {
      $(this).nextAll(".tel_num").eq(0).focus();
    }

    if (this.value.length === 0) {
      $(this).prevAll(".tel_num").eq(0).focus();
    }
  });

  jQuery(
    '<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>'
  ).insertAfter(".quantity input");
  jQuery(".quantity").each(function () {
    var spinner = jQuery(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find(".quantity-up"),
      btnDown = spinner.find(".quantity-down"),
      min = input.attr("min"),
      max = input.attr("max");
    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
      $(this).parent().parent().siblings(".updateBtn").removeClass("d-none");
    });
    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
      $(this).parent().parent().siblings(".updateBtn").removeClass("d-none");
    });
  });

    // hold onto the drop down menu
    var dropdownMenu;

    // and when you show it, move it to the body
    $(".table-responsive .table").on("show.bs.dropdown", function (e) {
      // grab the menu
      console.log("show");
      dropdownMenu = $(e.target).find(".dropdown-menu");

      console.log(dropdownMenu);

      // detach it and append it to the body
      $("body").append(dropdownMenu.detach());

      // grab the new offset position
      var eOffset = $(e.target).offset();

      // make sure to place it where it would normally go (this could be improved)
      dropdownMenu.css({
        display: "block",
        top: eOffset.top + $(e.target).outerHeight(),
        left: eOffset.left,
      });
    });

    // and when you hide it, reattach the drop down, and hide it normally
    $(".table-responsive .table").on("hide.bs.dropdown", function (e) {
      $(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });

})(jQuery); // Fully reference jQuery after this point.
