/*<location altitude="2" latitude="50" longitude="50">
                <temperature id="TTT" unit="celsius" value="-1.6"></temperature>
                <windDirection id="dd" deg="98.6" name="E"></windDirection>
                <windSpeed id="ff" mps="5.1" beaufort="3" name="Lett bris"></windSpeed>
                <humidity unit="percent" value="67.6"></humidity>
                <pressure id="pr" unit="hPa" value="1030.3"></pressure>
                <cloudiness id="NN" percent="98.4"></cloudiness>
                <fog id="FOG" percent="0.0"></fog>
                <lowClouds id="LOW" percent="91.4"></lowClouds>
                <mediumClouds id="MEDIUM" percent="1.6"></mediumClouds>
                <highClouds id="HIGH" percent="81.2"></highClouds>
                <dewpointTemperature id="TD" unit="celsius" value="-6.9"></dewpointTemperature>
            </location>
*/
struct S_standard{
    string units;
    int value;
    int dec_pow;
};

struct S_wind{
    int direction_deg;
    string direction_card;
    int speed;
    int dec_pow;
};

struct S_clouds{
    string id;
    int percent;
};


struct location{
    int altitude;
    int latitude;
    int lat_dec_pow;
    int longitude;
    int lon_dec_pow;
    uint timestamp
    S_standard temp;
    S_standard humidity;
    S_standard pressure;
    S_standard dewpointTemp;
    S_wind wind;
    S_clouds low;
    S_clouds medium;
    S_clouds high;
    int fog;
    int fog_dec_pow
    int cloudiness;
    int cloud_dec_pow;
};