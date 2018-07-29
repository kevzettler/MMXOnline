export class Path {
  winMusic: string = "assets/music/win.mp3?v=1.0.1";
  loseMusic: string = "assets/music/lose.mp3?v=1.0.1";
  menuMusic: string = "assets/music/menu.mp3?v=1.0.1";
  bossMusic: string = "assets/music/BossBattle.mp3?v=1.0.1";
  powerPlantMusic: string = "assets/music/PowerPlant.mp3?v=1.0.1";
  highwayMusic: string = "assets/music/highway.mp3?v=1.0.1";
  galleryMusic: string = "assets/music/gallery.mp3?v=1.0.1";

  powerPlantParallax: string = "assets/backgrounds/powerplant_parallex.png?v=1.0.1";
  highwayParallax: string = "assets/backgrounds/highway_parallax.png?v=1.0.1";
  galleryParallax: string = "assets/backgrounds/gallery_parallax.png?v=1.0.1";  
  highwayForeground: string = "assets/backgrounds/highway_foreground.png?v=1.0.1";
  galleryForeground: string = "assets/backgrounds/gallery_foreground.png?v=1.0.1";

  effectsSpritesheetPath: string = "assets/spritesheets/effects.png?v=1.0.1";
  megaManXSpritesheetPath: string = "assets/spritesheets/MegamanX.png?v=1.0.1";

  redPalette: string = "assets/palettes/red.png?v=1.0.1";
  boomerangPalette: string = "assets/palettes/boomerang.png?v=1.0.1";
  electric_sparkPalette: string = "assets/palettes/electric_spark.png?v=1.0.1";
  fire_wavePalette: string = "assets/palettes/fire_wave.png?v=1.0.1";
  rolling_shieldPalette: string = "assets/palettes/rolling_shield.png?v=1.0.1";
  shotgun_icePalette: string = "assets/palettes/shotgun_ice.png?v=1.0.1";
  stingPalette: string = "assets/palettes/sting.png?v=1.0.1";
  tornadoPalette: string = "assets/palettes/tornado.png?v=1.0.1";
  torpedoPalette: string = "assets/palettes/torpedo.png?v=1.0.1";

  soundsheetPath: string = "assets/soundsheets/mmx_sfx.mp3?v=1.0.1";

  getSoundPathFromFile(fileName: string) {
    return "assets/sounds/" + fileName + "?v=1.0.1";
  }

  get version() {
    return "?v=1.0.1";
  }
}