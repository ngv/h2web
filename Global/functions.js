/*
Copyright (c) 2009, National Gallery of Victoria
All rights reserved.

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions 
are met:

Redistributions of source code must retain the above copyright notice, 
this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, 
this list of conditions and the following disclaimer in the documentation 
and/or other materials provided with the distribution.
Neither the name of the National Gallery of Victoria nor the names of its 
contributors may be used to endorse or promote products derived from this 
software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS 
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR 
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, 
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


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
