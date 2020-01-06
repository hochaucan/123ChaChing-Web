﻿/*
Copyright (c) 2012 <a href="http://www.gutgames.com">James Craig</a>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

#region Usings
using System.Collections.Generic;
using System.Globalization;
using Utilities.Web.ExtensionMethods;
using Utilities.Web.Google.BaseClasses;
using Utilities.Web.Google.Enums;
using Utilities.Web.Google.HelperClasses;
using Utilities.Web.Google.Interfaces;
#endregion

namespace Utilities.Web.Google.StaticMaps
{
    /// <summary>
    /// Static Maps API helper
    /// </summary>
    public class Map:APIBase
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        public Map()
            : base()
        {
            Zoom = 12;
            Width = 100;
            Height = 100;
            Scale = 1;
            Format = ImageFormat.PNG;
            MapType = MapType.RoadMap;
            Sensor = false;
            Markers = new List<Markers>();
        }

        #endregion

        #region Properties

        /// <summary>
        /// API location
        /// </summary>
        public override string APILocation { get { return (UseHTTPS ? "https://" : "http://") + "maps.googleapis.com/maps/api/staticmap"; } }

        /// <summary>
        /// Center of the map
        /// </summary>
        public ILocation Center { get; set; }

        /// <summary>
        /// Zoom level (should be between 0 and 21
        /// </summary>
        public int Zoom { get; set; }

        /// <summary>
        /// Width of the map
        /// </summary>
        public int Width { get; set; }

        /// <summary>
        /// Height of the map
        /// </summary>
        public int Height { get; set; }

        /// <summary>
        /// Scale of the map (values are 1, 2, and 4 for business customers)
        /// </summary>
        public int Scale { get; set; }

        /// <summary>
        /// Image format
        /// </summary>
        public ImageFormat Format { get; set; }

        /// <summary>
        /// Map type
        /// </summary>
        public MapType MapType { get; set; }

        /// <summary>
        /// Language for the map to use
        /// </summary>
        public string Language { get; set; }

        /// <summary>
        /// Displays appropriate borders based on geo-political sensitivities (uses two-character ccTLD values)
        /// </summary>
        public string Region { get; set; }

        /// <summary>
        /// A list of markers
        /// </summary>
        public ICollection<Markers> Markers { get; private set; }

        /// <summary>
        /// Determines if a sensor is used to determine the user's location
        /// </summary>
        public bool Sensor { get; set; }

        #endregion

        #region Functions

        /// <summary>
        /// Converts the map data to a URL
        /// </summary>
        /// <returns>The map as a URL</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Globalization", "CA1308:NormalizeStringsToUppercase")]
        public override string ToString()
        {
            string Result = "sensor=" + Sensor.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture).URLEncode()
                + (Center==null ? "" : ("&center=" + Center.ToString().URLEncode()))
                + "&zoom=" + Zoom.ToString(CultureInfo.InvariantCulture).URLEncode()
                + "&size=" + (Width.ToString(CultureInfo.InvariantCulture) + "x" + Height.ToString(CultureInfo.InvariantCulture)).URLEncode()
                + "&scale=" + Scale.ToString(CultureInfo.InvariantCulture).URLEncode()
                + "&format=" + Format.ToString().ToLower(CultureInfo.InvariantCulture).URLEncode()
                + "&maptype=" + MapType.ToString().ToLower(CultureInfo.InvariantCulture).URLEncode()
                + (string.IsNullOrEmpty(Language) ? "" : "&language=" + Language.URLEncode())
                + (string.IsNullOrEmpty(Region) ? "" : "&region=" + Region.URLEncode());
            foreach (Markers Marker in Markers)
                Result += "&" + Marker.ToString();
            Result += base.ToString();
            return APILocation + "?" + Result;
        }

        #endregion
    }
}
