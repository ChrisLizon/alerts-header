import { sp } from '@pnp/sp/presets/all';
import { Web } from '@pnp/sp/webs';

export class AlertsService {
    public static readonly LIST_TITLE:string = "Alerts";
    public static readonly CONFIG_KEY:string = "AlertsSource";

    public static async getAlerts(isRemote:boolean, srcPath?:string):Promise<Array<any>> {

      var dateTimeNow: Date = new Date();

      if(isRemote){
        if(srcPath == null){
          return Promise.resolve([]);
        }

        //const _web = Web(`${window.location.protocol}//${window.location.hostname}/${srcPath}`);
        //return _web.lists
        const itme: any[] = await sp.web.lists.getByTitle("Alerts")
        .items.select("ID", "Title", "AlertType", "Description", "Link")
        .filter(
          `StartDateTime le datetime'${dateTimeNow.toISOString()}' and EndDateTime ge datetime'${dateTimeNow.toISOString()}'`
        )
        .orderBy("StartDateTime", false)
        .get();
      }
      else
      {
        return sp.web.lists
        .getByTitle("Alerts")
        .items.select("ID", "Title", "AlertType", "Description", "Link", "EndDateTime")
        .filter(
          `StartDateTime le datetime'${dateTimeNow.toISOString()}' and EndDateTime ge datetime'${dateTimeNow.toISOString()}'`
        )
        .orderBy("StartDateTime", false)
        .get();
      }
    }
}
