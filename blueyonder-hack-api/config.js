const PARSE_APP_ID = "yFZllvpJuD6Etn6ipvJHTY6iBixjuRuV2qcpNgeo"
const PARSE_JAVASCRIPT_KEY = "ozlcU5VNGxLn3mcdUBIODxfPHs52WRLXAf35ekeS"
const API_BASE_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3001"

module.exports = {
    PARSE_APP_ID,
    PARSE_JAVASCRIPT_KEY,
    API_BASE_URL
}