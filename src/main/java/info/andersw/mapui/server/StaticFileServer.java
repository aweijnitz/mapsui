package info.andersw.mapui.server;

import io.undertow.Undertow;
import io.undertow.server.handlers.PathHandler;
import io.undertow.server.handlers.resource.FileResourceManager;
import io.undertow.server.handlers.resource.ResourceHandler;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.undertow.Handlers.*;

/**
 * Static embedded file server based on Undertow.
 * 
 */
public class StaticFileServer {
	private static final Logger log = LoggerFactory
			.getLogger(StaticFileServer.class);
	private static final int transferMinSize = 512;

	private Undertow server;
	private String rootDir = "";

	public StaticFileServer(String rootDir) {
		this.rootDir = rootDir;
	}

	public StaticFileServer() {
	}


	public void buildAndStartServer(int port, String host, String root) {
		log.debug("Building server");
		server = Undertow.builder().addHttpListener(port, host)
				.setHandler(getFileResourceHandler(root)).build();
		server.start();
	}

	public void stopServer() {
		if (server != null) {
			log.info("Stopping server");
			server.stop();
		}
	}

	private ResourceHandler getFileResourceHandler(String root) {
		return new ResourceHandler()
				.setResourceManager(
						new FileResourceManager((new File(root)),
								transferMinSize))
				.setDirectoryListingEnabled(true).setWelcomeFiles("index.html");
	}

	public static void main(final String[] args) {
		String root = ""; // TODO: parse web root and port from args
		int port = 9090;
		StaticFileServer fileServer = new StaticFileServer(root);
		fileServer.buildAndStartServer(port, "localhost", root);
		log.info("Server listening on http://localhost:" + port
				+ ". Web root is " + (new File(root).getAbsolutePath()));
	}

}
