// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

(function () {


    var submitButton = document.getElementById("submit");

    submitButton.addEventListener('click', GetData);

    function GetData(e) {
        e.preventDefault();
        var url = '/Home/Search';
        var repositoryName = document.getElementById("repositoryName").value;
        var repository_result = document.getElementById("repository-result");
        repository_result.innerHTML = "";
        $("#error").html("");
        var len = 0;

        $.get({
            type: 'GET',
            url: url,
            data: { repositoryName: repositoryName },
            success: function (result) {
              
                len = result[0].items.length;
                if (len <= 1) {
                    $("#error").html("Sorry, but no results found!");
                }
                loopResult = result[0].items;
                loopResult.forEach(function (item, key) {
                    var id = item.id;
                    var name = item.name;
                    var avatar = item.owner.avatar_url;

                    var card = document.createElement("div");
                    card.className = "card";
                    var row = document.createElement("div");
                    row.className = "row-element";
                    var col_8 = document.createElement("div");
                    col_8.className = "col-md-8";
                    var p = document.createElement("p");
                    p.innerHTML = name;
                    var col_4 = document.createElement("div");
                    col_4.className = "col-md-4";
                    var avatar_img = document.createElement("img");
                    avatar_img.src = avatar;
                    avatar_img.className = "avatar";
                    
                    var bookmark = document.createElement("a");
                    bookmark.className = "btn btn-primary btn-sm bookmark";
                    bookmark.id = id;
                    bookmark.innerHTML = "Bookmark";

                    //append
                    col_8.appendChild(p);
                    col_4.appendChild(avatar_img);
                    row.appendChild(col_8);
                    row.appendChild(col_4);
                    row.appendChild(bookmark);
                    card.appendChild(row);
                    repository_result.appendChild(card);

                 
                    

                    bookmark.addEventListener('click', (function (id) {
                        $(".bookmark").click(function () {
                            $("#bookmark-content").html("");
                        });
                        var bookmark_panel = document.getElementById("bookmark-content");
                       
                   return function () {
                            $.get({
                                type: 'GET',
                                url: '/Home/SessionManager',
                                data: { id: id },
                                success: function (res) {
                                   
                                    res.forEach(function (item, key) {
                                        var card = document.createElement("div");
                                        card.className = "card";
                                        var row = document.createElement("div");
                                        row.className = "row-element";
                                        var col_8 = document.createElement("div");
                                        col_8.className = "col-md-8";
                                        var p = document.createElement("p");
                                        p.innerHTML = item.name;
                                        var col_4 = document.createElement("div");
                                        col_4.className = "col-md-4";
                                        var avatar_img = document.createElement("img");
                                        avatar_img.src = item.owner.avatar_url;
                                        avatar_img.className = "avatar";

                                        col_8.appendChild(p);
                                        col_4.appendChild(avatar_img);
                                        row.appendChild(col_8);
                                        row.appendChild(col_4);
                                        card.appendChild(row);
                                        bookmark_panel.appendChild(card);
                                    });


                                    $("#bookmark-panel").animate({
                                        "left": "0px"
                                    });
                                }
                            });
                        };

                    })(id));

                  

                });
            },error: function () {
                alert('error!');
            }
        });
    }



    //Slide bookmark panel

    var bookmark_panel_button = document.getElementById("open-bookmark");
    var bookmark_pane = document.getElementById("bookmark-panel");
    bookmark_panel_button.addEventListener('click', open_bookmark);

    function open_bookmark() { $("#bookmark-panel").animate({"left": "0px" });}
    $("input").click(function () {$("#bookmark-panel").animate({"left": "-400px"});});
 



})();



