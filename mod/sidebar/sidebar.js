define([], function(){
    // Adding stylesheet
    var head = document.getElementsByTagName("HEAD")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "mod/sidebar/sidebar.css";
    head.appendChild(link);


    // Creating the sidebar with default text
    var sidebar = [];

    sidebar.div = document.createElement("div");
    sidebar.div.id = "sidebar";

    sidebar.h1 = document.createElement("h1");
    sidebar.div.appendChild(sidebar.h1);

    sidebar.h2 = document.createElement("h2");
    sidebar.div.appendChild(sidebar.h2);

    sidebar.content = document.createElement("div");
    sidebar.div.appendChild(sidebar.content);

    document.body.appendChild(sidebar.div);

    sidebar.create = function(title, subTitle, content, hidable){
        sidebar.updateTitle(title);
        sidebar.updateSubTitle(subTitle);
        sidebar.updateContent(content);
        if(hidable){
            sidebar.makeHidable();
        }
    }

    sidebar.updateTitle = function(title){
        sidebar.h1.innerText = title;
    }

    sidebar.updateSubTitle = function(subTitle){
        sidebar.h2.innerText = subTitle;
    }

    sidebar.updateContent = function(content){
        sidebar.content.innerHTML = content;
    }

    sidebar.makeHidable = function(){
        setTimeout(function(){
            sidebar.div.style.left = - sidebar.div.offsetWidth + 10;
            sidebar.div.onmouseover = function(){
                sidebar.div.style.left = 0;
            }
            sidebar.div.onmouseout = function(){
                sidebar.div.style.left = - sidebar.div.offsetWidth + 10;
            }
        }, 0);
    }

    return sidebar;
});

/*

        <div id="sidebar">
            <!--h1>Login</h1>
            <h2>The Social Nextwork</h2>
            <form>
                <input type="text" name="username" placeholder="Username">
                <input type="password" name="password" placeholder="Password">
                <input type="submit" name="Login">
            </form-->
            <h1>The Move Blog</h1>
            <h2>Rebuilding BuddyGo</h2>
            <p>This is an attempt to relaunch one of my old projects. I am hosting a static blog page as a concept so that my buddies can see. Some useful tips:</p>
            <ul>
                <li>Drag individual blog posts using the titlebar.</li>
                <li>Using middle mouse button, drag the background canvas to go to other blog posts that are not visible in this page.</li>
            </ul>
        </div>

*/