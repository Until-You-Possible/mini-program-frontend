// theme

import { Http } from "../../utils/http";

export class Theme {

  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  Themes = [];
  async getThemes () {
  const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`;
    this.Themes = await Http.request({
      url: `theme/by/names`,
      data: {
        names
      }
    });
  }
  async getHomeLocationA () {
    return this.Themes.filter( t => t.name === Theme.locationA);
  }
  getHomeLocationE() {
    return this.Themes.filter(t => t.name === Theme.locationE)
  }

  getHomeLocationF() {
    return this.Themes.filter(t => t.name === Theme.locationF)
  }

  getHomeLocationH() {
    return this.Themes.filter(t => t.name === Theme.locationH)
  }
  static getHomeLocationESpu() {
    return Theme.getThemeSpuByName(Theme.locationE);
  }
  // get spu message
  static getThemeSpuByName(name) {
    return Http.request({
      url: `theme/name/${name}/with_spu`
    });
  }


}