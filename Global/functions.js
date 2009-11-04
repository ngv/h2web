function onStart() {
    var args = java.lang.reflect.Array.newInstance(java.lang.String, 6);
    args[0] = "-webAllowOthers";
    args[1] = "true";

    args[2] = "-webSSL";
    args[3] = getProperty("h2.ssl", "false");

    args[4] = "-webPort";
    args[5] = getProperty("h2.webport", "8082");

    app.data.h2WebServer = Packages.org.h2.tools.Server.createWebServer(args);
    app.data.h2WebServer.start();
    
    if (app.data.h2WebServer.isRunning(false)) {
        writeln("H2 web server started by " + app.name + " on port:"
                        + getProperty("h2.webport", "8082"));
    } else {
        writeln("FAILED to start H2 web server by " + app.name);
    }

    if (getProperty("h2.tcpServer")) {
        var args = java.lang.reflect.Array.newInstance(java.lang.String, 4);
        args[0] = "-tcpAllowOthers";
        args[1] =  getProperty("h2.tcpAllowRemote", "false");

        args[2] = "-tcpPort";
        args[3] = getProperty("h2.tcpPort", "9092");
        
        app.data.h2TcpServer = Packages.org.h2.tools.Server.createTcpServer(args);
        app.data.h2TcpServer.start();
        
        if (app.data.h2TcpServer.isRunning(false)) {
            writeln("H2 TCP server started by " + app.name + " on port:"
                            + getProperty("h2.tcpPort", "9092"));
        } else {
            writeln("FAILED to start H2 TCP server by " + app.name);
        }
    }    
}

function onStop() {
    if (app.data.h2WebServer) {
        app.data.h2WebServer.stop();
        writeln("H2 web server stopped by " + app.name);
    }
    if (app.data.h2TcpServer) {
        app.data.h2TcpServer.stop();
        writeln("H2 TCP server stopped by " + app.name);
    }
}
