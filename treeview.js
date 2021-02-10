


$(document).ready(function () {
    $("#control-container").on("click", ".collapse", function () {
            $("ul").not(".parent").each(function(){
                $(this).hide();
            })
            $("ul.treeview").removeClass("fa-caret-down").addClass("fa-caret-right");
        
    });


    $("#control-container").on("click", "li.parent .fa-caret-down,li.parent .fa-caret-right", function () {

        if ($(this).siblings("ul").is(":visible")) {
            $(this).siblings("ul").hide();
            $(this).removeClass("fa-caret-down").addClass("fa-caret-right");
        }
        else {
            $(this).siblings("ul").show();
            $(this).removeClass("fa-caret-right").addClass("fa-caret-down");
        }
    });

    recursive($(".treeview"));
    $(".treeview li > .chk-inline").not(".treeview li.parent > .chk-inline").before(" <i class='fa'>&nbsp;</i>");
    $(".treeview li.parent > .chk-inline").before(" <i class='fa fa-caret-down'></i>");

    $('input[type="checkbox"]').change(function (e) {

        var checked = $(this).prop("checked"),
            container = $(this).parent(),
            siblings = container.siblings();

        container.find('input[type="checkbox"]').prop({
            indeterminate: false,
            checked: checked
        });

        function checkSiblings(el) {

            var parent = el.parent().parent(),
                all = true;

            el.siblings().each(function () {
                let returnValue = all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
                return returnValue;
            });

            if (all && checked) {

                parent.children('input[type="checkbox"]').prop({
                    indeterminate: false,
                    checked: checked
                });

                checkSiblings(parent);

            } else if (all && !checked) {

                parent.children('input[type="checkbox"]').prop("checked", checked);
                parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
                checkSiblings(parent);

            } else {

                el.parents("li").children('input[type="checkbox"]').prop({
                    indeterminate: true,
                    checked: false
                });

            }

        }

        checkSiblings(container);
    });

});

function recursive(root) {
    $("li", $(root)).each(function (index) {
        if ($(this).children("ul").length) {
            $(this).addClass("parent");
        }
        var newRoot = $(this).children("ul");
        recursive(newRoot);
    });
}