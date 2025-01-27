module.exports = {
  apps: [{
    name: "EISN Mirror",
    script: "npm",
    args: "start",
    // Environment variables
    env: {
      NODE_ENV: "production",
      PORT: 3000,
      HOSTNAME: "0.0.0.0"
    },

    // Logging configuration
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    out_file: "./logs/out.log",
    error_file: "./logs/error.log",

    // Monitoring and restart options
    watch: false,
    max_memory_restart: "500M", // Restart if memory exceeds 500MB
    restart_delay: 3000, // Wait 3 seconds between restarts
    
    // Performance and scaling
    max_restarts: 10,
    combine_logs: true
  }]
};
