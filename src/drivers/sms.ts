/* eslint-disable */
import unirest from 'unirest';
const req = unirest('POST', 'https://www.fast2sms.com/dev/bulkV2');
class Sms_ {
  async sendSms({ mobileNo, messageId, variables }) {
    req.headers({
      authorization:
        'qeopCR4nHlrqRDI4NEMik6O1ddg2EUlSyPS0lgWkOEavEd0YQgAKaFm1zDHB',
      'Content-Type': 'application/json',
    });
    req.form({
      route: 'dlt',
      sender_id: 'DFVOTP',
      message: messageId,
      variables_values: variables,
      flash: 0,
      numbers: mobileNo,
    });
    req.end(function (res: any) {
      if (res.error) throw new Error(res.error);
      return res.body;
    });
  }
}
export const Sms = new Sms_();
