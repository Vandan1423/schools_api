const db = require("../config/datatbase");

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
}

module.exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (
        !name ||
        !address ||
        typeof latitude !== "number" ||
        typeof longitude !== "number"
    ) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    try {
        await db.execute(
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
            [name, address, latitude, longitude],
        );
        res.status(201).json({ message: "School added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res
            .status(400)
            .json({ error: "Latitude and longitude required" });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    try {
        const [schools] = await db.execute("SELECT * FROM schools");

        const sorted = schools
            .map((school) => {
                const distance = calculateDistance(
                    userLat,
                    userLon,
                    school.latitude,
                    school.longitude,
                );
                return { ...school, distance: distance };
            })
            .sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
