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
    float value;
}

struct S_wind{
    float direction_deg;
    string direction_card;
    float speed;
}

struc S_clouds{
    string id;
    float percent;
}


struct location{
    float altitude;
    float latitude;
    float longitude;
    int timestamp
    S_standard temp;
    S_standard humidity;
    S_standard pressure;
    S_standard dewpointTemp;
    S_wind wind;
    S_clouds low;
    S_clouds medium;
    S_clouds high;
    float fog
    float cloudiness;
}