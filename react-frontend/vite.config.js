
import { defineConfig, loadEnv } from "vite";
import plugins from './Plugins';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: plugins(mode),
        // server: {
        //     port: 3000, // To run the app on port 3000
        //     open: true // If we want to open the app once its started
        // },
    };
});