if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude.toFixed(5);
            const lon = position.coords.longitude.toFixed(5);
            document.getElementById("gpsLabel").innerText = 
                `Posizione: ${lat}, ${lon}`;
        },
        error => {
            document.getElementById("gpsLabel").innerText = 
                "Posizione: non disponibile";
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
} else {
    document.getElementById("gpsLabel").innerText = 
        "Posizione: non supportata";
}