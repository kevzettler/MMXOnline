export class Path {
  winMusic: string = "assets/music/win.mp3?v=1.0.0";
  loseMusic: string = "assets/music/lose.mp3?v=1.0.0";
  menuMusic: string = "assets/music/menu.mp3?v=1.0.0";
  bossMusic: string = "assets/music/BossBattle.mp3?v=1.0.0";
  powerPlantMusic: string = "assets/music/PowerPlant.mp3?v=1.0.0";
  highwayMusic: string = "assets/music/highway.mp3?v=1.0.0";
  galleryMusic: string = "assets/music/gallery.mp3?v=1.0.0";

  powerPlantParallax: string = "assets/backgrounds/powerplant_parallex.png?v=1.0.0";
  highwayParallax: string = "assets/backgrounds/highway_parallax.png?v=1.0.0";
  galleryParallax: string = "assets/backgrounds/gallery_parallax.png?v=1.0.0";  
  highwayForeground: string = "assets/backgrounds/highway_foreground.png?v=1.0.0";
  galleryForeground: string = "assets/backgrounds/gallery_foreground.png?v=1.0.0";

  effectsSpritesheetPath: string = "assets/spritesheets/effects.png?v=1.0.0";
  megaManXSpritesheetPath: string = "assets/spritesheets/MegamanX.png?v=1.0.0";

  redPalette: string = "assets/palettes/red.png?v=1.0.0";
  boomerangPalette: string = "assets/palettes/boomerang.png?v=1.0.0";
  electric_sparkPalette: string = "assets/palettes/electric_spark.png?v=1.0.0";
  fire_wavePalette: string = "assets/palettes/fire_wave.png?v=1.0.0";
  rolling_shieldPalette: string = "assets/palettes/rolling_shield.png?v=1.0.0";
  shotgun_icePalette: string = "assets/palettes/shotgun_ice.png?v=1.0.0";
  stingPalette: string = "assets/palettes/sting.png?v=1.0.0";
  tornadoPalette: string = "assets/palettes/tornado.png?v=1.0.0";
  torpedoPalette: string = "assets/palettes/torpedo.png?v=1.0.0";

  soundsheetPath: string = "assets/soundsheets/mmx_sfx.mp3?v=1.0.0";

  getSoundPathFromFile(fileName: string) {
    return "assets/sounds/" + fileName + "?v=1.0.0";
  }

  get version() {
    return "?v=1.0.0";
  }
}