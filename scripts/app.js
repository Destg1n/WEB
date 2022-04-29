var organizeByTags = function (toDoObjects) { 

	console.log("organizeByTags called");
	var tags = [];
	toDoObjects.forEach(function (toDo) {
		toDo.tags.forEach(function (tag) {
			if (tags.indexOf(tag) === -1) { 
				tags.push(tag);
			}
		});
	}); 
	console.log(tags);

	var tagObjects = tags.map(function (tag) {

		var toDosWithTag = []; 
		toDoObjects.forEach(function (toDo) {
			if (toDo.tags.indexOf(tag) !== -1) { 
				toDosWithTag.push(toDo.description);
			}
		});
		return { "name": tag, "toDos": toDosWithTag };
	});
	console.log(tagObjects);
	return tagObjects;
};

var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

    $("document").ready( function(){
    $(".tabs a span").toArray().forEach(function (element) { 
        $(element).on("click", function () {
            var $element = $(element);
            $(".tabs a span").removeClass("active"); 
            $(element).addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) { 
                for (var i = toDos.length-1; i > -1; i--) { 
                    $(".content").append($("<li>").text(toDos[i]));
                }
            } 
            else if ($element.parent().is(":nth-child(2)")) { 
                toDos.forEach(function (todo) { 
                    $(".content").append($("<li>").text(todo));
                });
            } 
			else if ($element.parent().is(":nth-child(3)")) {
				console.log("щелк по тегам");
				var organizedByTag = organizeByTags(toDoObjects);

					organizedByTag.forEach(function (tag) { 
						var $tagName = $("<h3>").text(tag.name), 
						$content = $("<ul>"); 
						tag.toDos.forEach(function (description) { 
							var $li = $("<li>").text(description); 
							$content.append($li);
						});
						$("main .content").append($tagName); 
						$("main .content").append($content);
					});
			}
            else if ($element.parent().is(":nth-child(4)")) { 
				var $input = $("<input>").addClass("description"), 
				$inputLabel = $("<h5>").text("Новая задача: "),
				$tagInput = $("<input>").addClass("tags"),
				$tagLabel = $("<h5>").text("Тэги: "),
				$button = $("<button>").text("+");
				$button.on("click", function () {
					var description = $input.val(),
					tags = $tagInput.val().split(","); 
					toDoObjects.push({"description":description, "tags":tags}); 
					toDos = toDoObjects.map(function (toDo) {
						return toDo.description;
					});
					$input.val("");
					$tagInput.val("");
				});
			$("main .content").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button); 
            }
            return false;
        })
    })
    $(".tabs a:first-child span").trigger("click");
    }) 
};
$(document).ready(function () {
    $.getJSON("./scripts/todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
}); 