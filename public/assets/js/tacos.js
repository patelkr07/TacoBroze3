
$(function() {
    $(".change-pickedup").on("click", function(event) {
        var id = $(this).data("id");
        var newPickedup = $(this).data("newpickedup");

        var newPickedupState = {
            picked_up: newPickedup
        };

        $.ajax("/api/tacos/" + id, {
            type: "PUT",
            data: newPickedupState
        }).then(
            function() {
                console.log("changed picked up to", newPickedup);

                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newTaco = {
            taco_name: $("#taco-name").val().trim(),
            shell: $("#shell").val().trim(),
            vegetarian: $("[name=vegetarian]:checked").val().trim(),
            picked_up: $("#picked_up").val()
        };

        $.ajax("/api/tacos", {
            type: "POST",
            data: newTaco
        }).then(
            function() {
                console.log("created new taco");

                location.reload();
            }
        );
    });

    $(".delete-taco").on("click", function(event) {
        var id = $(this).data("id");

        $.ajax("/api/tacos/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("deleted taco", id);

                location.reload();
            }
        )
    })
});