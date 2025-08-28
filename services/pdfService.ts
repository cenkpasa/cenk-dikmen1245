import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Offer, Customer, Reconciliation, Invoice } from '../types';
import { COMPANY_INFO } from '../constants';

export const getOfferHtml = (offer: Offer, customer: Customer | undefined, t: (key: string, replacements?: Record<string, string>) => string, logoBase64: string): string => {
    return `
    <div style="font-family: Arial, sans-serif; width: 210mm; min-height: 297mm; background: white; color: #000; padding: 10mm; box-sizing: border-box; display: flex; flex-direction: column; font-size: 9pt; line-height: 1.4;">
        
        <!-- Header Section -->
        <div style="background-color: #c00000; height: 20px; margin: -10mm -10mm 10mm -10mm;"></div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 5mm;">
          <tr>
            <td style="width: 50%; vertical-align: top;">
              <img src="${logoBase64}" style="max-width: 120mm; max-height: 25mm;" alt="Company Logo"/>
              <p style="margin: 2px 0 0 0; font-size: 11pt; font-weight: bold;">CENK DİKMEN</p>
              <p style="margin: 0; font-size: 9pt;">Genel Müdür</p>
              <p style="margin: 0; font-size: 9pt;">+90 533 404 79 38</p>
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right; font-size: 9pt;">
              <p style="margin: 0;">İvedik OSB Melih Gökçek Blv.</p>
              <p style="margin: 0;">No: 151/4 Yenimahalle / ANKARA</p>
              <p style="margin: 0;">${COMPANY_INFO.email}</p>
              <p style="margin: 0;">${COMPANY_INFO.website}</p>
            </td>
          </tr>
        </table>
        <div style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxwb2x5Z29uIHBvaW50cz0iMCwwIDEwMCwwIDAsMTAiIGZpbGw9IiNjMDAwMDAiLz48L3N2Zz4='); background-repeat: repeat-x; height: 10px; background-size: contain; width:100%;"></div>

        <h1 style="text-align: center; font-size: 20pt; font-weight: bold; margin: 5mm 0; padding-bottom: 2mm; border-bottom: 2px solid #000;">FİYAT TEKLİFİ</h1>

        <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
          <tr>
            <td style="width: 50%; vertical-align: top; border: 1px solid #000; padding: 3mm;">
               <table style="width: 100%;">
                    <tr><td style="font-weight: bold; width: 80px;">Firma / Kuruluş</td><td>: ${customer?.name ?? ''}</td></tr>
                    <tr><td style="font-weight: bold;">Yetkili</td><td>: ${offer.firma.yetkili}</td></tr>
                    <tr><td style="font-weight: bold;">Telefon</td><td>: ${offer.firma.telefon}</td></tr>
                    <tr><td style="font-weight: bold;">E-Posta</td><td>: ${offer.firma.eposta}</td></tr>
                    <tr><td style="font-weight: bold;">Vade</td><td>: ${offer.firma.vade}</td></tr>
                    <tr><td style="font-weight: bold;">Teklif Tarihi</td><td>: ${offer.firma.teklifTarihi}</td></tr>
                    <tr><td style="font-weight: bold;">Teklif No</td><td>: ${offer.teklifNo}</td></tr>
               </table>
            </td>
            <td style="width: 50%; vertical-align: top; border: 1px solid #000; padding: 3mm;">
               <table style="width: 100%;">
                    <tr><td style="font-weight: bold; width: 100px;">Teklif veren Firma</td><td>: ${COMPANY_INFO.name}</td></tr>
                    <tr><td style="font-weight: bold;">Yetkili</td><td>: ${offer.teklifVeren.yetkili}</td></tr>
                    <tr><td style="font-weight: bold;">Telefon</td><td>: ${offer.teklifVeren.telefon || COMPANY_INFO.phone}</td></tr>
                    <tr><td style="font-weight: bold;">E-Posta</td><td>: ${offer.teklifVeren.eposta || COMPANY_INFO.email}</td></tr>
                </table>
            </td>
          </tr>
        </table>
        
        <p style="margin: 5mm 0;">Firmamızdan istemiş olduğunuz ürünlerimizle ilgili fiyat teklifimizi aşağıda bilgilerinize sunar iyi çalışmalar dileriz.</p>
        <p style="text-align: right; margin: 0 0 5mm 0;">Saygılarımızla,</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
          <thead style="background-color: #c00000; color: white;">
            <tr>
              <th style="padding: 2mm; border: 1px solid #000; font-weight: bold;">MALZEMENİN CİNSİ</th>
              <th style="padding: 2mm; border: 1px solid #000; font-weight: bold; width: 50px;">MİKTAR</th>
              <th style="padding: 2mm; border: 1px solid #000; font-weight: bold; width: 50px;">BİRİM</th>
              <th style="padding: 2mm; border: 1px solid #000; font-weight: bold; width: 80px;">FİYAT</th>
              <th style="padding: 2mm; border: 1px solid #000; font-weight: bold; width: 80px;">TUTAR</th>
              <th style="padding: 2mm; border: 1px solid #000; font-weight: bold; width: 80px;">TESLİM SÜRESİ</th>
            </tr>
          </thead>
          <tbody>
            ${offer.items.map((item) => `
              <tr style="border: 1px solid #000;">
                <td style="padding: 2mm; border: 1px solid #000; text-align: left;">${item.cins}</td>
                <td style="padding: 2mm; border: 1px solid #000; text-align: center;">${item.miktar}</td>
                <td style="padding: 2mm; border: 1px solid #000; text-align: center;">${item.birim}</td>
                <td style="padding: 2mm; border: 1px solid #000; text-align: right;">${item.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                <td style="padding: 2mm; border: 1px solid #000; text-align: right;">${item.tutar.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                <td style="padding: 2mm; border: 1px solid #000; text-align: center;">${item.teslimSuresi}</td>
              </tr>
            `).join('')}
            ${Array(Math.max(0, 10 - offer.items.length)).fill('<tr><td style="padding: 2mm; border: 1px solid #000;">&nbsp;</td><td style="border: 1px solid #000;"></td><td style="border: 1px solid #000;"></td><td style="border: 1px solid #000;"></td><td style="border: 1px solid #000;"></td><td style="border: 1px solid #000;"></td></tr>').join('')}
          </tbody>
        </table>

        <table style="width: 100%; margin-top: 5mm; font-size: 9pt;">
          <tr>
            <td style="width: 60%; vertical-align: top;">
                <div style="border: 1px solid #000; padding: 2mm; min-height: 40mm;">
                  <strong style="display: block; margin-bottom: 5px;">TEKLİF NOT:</strong>
                  <p style="white-space: pre-wrap; margin: 0;">${offer.notlar}</p>
                </div>
            </td>
            <td style="width: 40%; vertical-align: top; padding-left: 5mm;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="border: 1px solid #000; padding: 2mm;">TOPLAM</td><td style="border: 1px solid #000; padding: 2mm; text-align: right;">${offer.toplam.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 2mm;">%20 KDV</td><td style="border: 1px solid #000; padding: 2mm; text-align: right;">${offer.kdv.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td></tr>
                    <tr style="background-color: #c00000; color: white; font-weight: bold;"><td style="border: 1px solid #000; padding: 2mm;">G.TOPLAM</td><td style="border: 1px solid #000; padding: 2mm; text-align: right;">${offer.genelToplam.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td></tr>
                </table>
            </td>
          </tr>
        </table>
        
        <div style="flex-grow: 1;"></div> <!-- Spacer -->

        <div style="font-size: 8pt; color: #333;">
          <p style="margin: 2px 0;">*Fiyatlarımıza KDV Dahil Değildir.</p>
          <p style="margin: 2px 0;">*Opsiyon 10 Gündür.</p>
          <p style="margin: 2px 0;">*Yurt Dışı Siparişler ve Özel Takımlar İadesi Söz Konusu Değildir.</p>
          <p style="margin: 2px 0;">*Verilen Fiyatlar Fatura Tarihindeki TCMB Döviz Satış Kurundan TL Çevrilecektir.</p>
          <p style="margin: 2px 0;"><b>Not:</b> Lütfen sipariş onayınızla birlikte firma / kuruluş, sevk ve teslim bilgilerinizi eksiksiz doldurunuz.</p>
        </div>

        <div style="border: 1px solid #000; padding: 2mm; margin-top: 5mm; text-align: center; font-size: 8pt;">
            <p style="margin: 0;">Yukarıda belirtilen adet, fiyat, teslim ve ödeme koşulları ile siparişimizdir.</p>
            <b style="font-size: 10pt;">Müşteri Sipariş Onay Bölümü :</b>
        </div>
      </div>
    `;
};


export const downloadOfferAsPdf = async (offer: Offer, customer: Customer | undefined, t: (key: string, replacements?: Record<string, string>) => string, logoBase64: string): Promise<{success: boolean}> => {
    
    const offerContentHtml = getOfferHtml(offer, customer, t, logoBase64);

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.innerHTML = offerContentHtml;
    document.body.appendChild(container);

    try {
        const canvas = await html2canvas(container.firstChild as HTMLElement, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = pdfHeight;
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
            position = -heightLeft;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
            heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save(`Teklif_${offer.teklifNo}.pdf`);
        return { success: true };
    } catch (error) {
        console.error('PDF generation error:', error);
        return { success: false };
    } finally {
        document.body.removeChild(container);
    }
};

const InfoRow = (label: string, value: string) => `
    <tr>
        <td style="padding: 2px 0; font-weight: normal; width: 100px;">${label}</td>
        <td style="padding: 2px 0; font-weight: normal; width: 10px;">:</td>
        <td style="padding: 2px 0; font-weight: normal;">${value || ''}</td>
    </tr>
`;

export const getReconciliationHtml = (reconciliation: Reconciliation, customer: Customer, invoices: Invoice[], t: (key: string) => string): string => {
    const today = new Date().toLocaleDateString('tr-TR');
    
    return `
    <div style="font-family: Arial, sans-serif; width: 210mm; min-height: 297mm; padding: 15mm; box-sizing: border-box; font-size: 11pt; color: #333; display: flex; flex-direction: column;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
                <td style="text-align: center; font-size: 16pt; font-weight: bold; padding-bottom: 20px;" colspan="2">Mutabakat Mektubu</td>
            </tr>
            <tr>
                 <td style="width: 50%;"></td>
                 <td style="text-align: right; font-size: 11pt;">Tarih : ${today}</td>
            </tr>
        </table>
        
        <p style="margin-top: 30px; margin-bottom: 10px;">Sayın ,</p>
        <p style="line-height: 1.5; margin: 0;">Dönemi Formlarına ilişkin fatura sayısı ve KDV hariç tutarlarına ait bilgiler aşağıda yer almaktadır.Mutabık olup olmadığınızı bildirmenizi rica ederiz.</p>
        <p style="margin-top: 10px; margin-bottom: 30px;">Saygılarımızla</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 10pt;">
            <tr>
                <td style="width: 50%; vertical-align: top; padding-right: 20px;">
                    <h3 style="font-size: 12pt; font-weight:bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">Gönderen</h3>
                    <table style="width: 100%;">
                        ${InfoRow('Vergi Dairesi', COMPANY_INFO.taxOffice)}
                        ${InfoRow('Vergi Numarası', COMPANY_INFO.taxNumber)}
                        ${InfoRow('Telefon', COMPANY_INFO.phone)}
                        ${InfoRow('Faks', COMPANY_INFO.fax)}
                        ${InfoRow('Yetkili', COMPANY_INFO.authorizedPerson)}
                        ${InfoRow('E-Posta', COMPANY_INFO.email)}
                    </table>
                </td>
                <td style="width: 50%; vertical-align: top; padding-left: 20px;">
                    <h3 style="font-size: 12pt; font-weight:bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">Cari Hesap Bilgileriniz</h3>
                     <table style="width: 100%;">
                        ${InfoRow('Vergi Dairesi', customer.taxOffice || '')}
                        ${InfoRow('Vergi Numarası', customer.taxNumber || '')}
                        ${InfoRow('Telefon', customer.phone1 || '')}
                        ${InfoRow('Faks', customer.fax || '')}
                        ${InfoRow('Yetkili', '')}
                        ${InfoRow('E-Posta', customer.email || '')}
                    </table>
                </td>
            </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; text-align: center; border: 1px solid #000; font-size: 10pt;">
            <thead style="background-color: #fff; border-bottom: 1px solid #000;">
                <tr>
                    <th style="border: 1px solid #000; padding: 8px; font-weight: bold;">Mutabakat</th>
                    <th style="border: 1px solid #000; padding: 8px; font-weight: bold;">Dönem</th>
                    <th style="border: 1px solid #000; padding: 8px; font-weight: bold;">Belge Sayısı</th>
                    <th style="border: 1px solid #000; padding: 8px; font-weight: bold;">Toplam Tutar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${t(reconciliation.type)}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${reconciliation.period}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${invoices.length}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${reconciliation.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                </tr>
            </tbody>
        </table>

        <h3 style="margin-top: 25px; font-size: 12pt; font-weight: bold;">Notlar</h3>
        <div style="border: 1px solid #ccc; min-height: 60px; padding: 5px; font-size: 10pt;">${reconciliation.notes || ''}</div>
        
        <div style="flex-grow: 1;"></div> <!-- Pushes content to bottom -->

        <table style="width: 100%; margin-top: 80px; text-align: center; font-size: 10pt;">
            <tr>
                <td style="width: 50%; padding-top: 20px; border-top: 1px solid #000;">Kaşe / İmza</td>
                <td style="width: 50%; padding-top: 20px; border-top: 1px solid #000;">Kaşe / İmza</td>
            </tr>
        </table>
        
        <div style="text-align: center; font-size: 9pt; color: #888; margin-top: 30px;">
            Bu mutabakat mektubu e-crm üzerinden oluşturulmuştur.
        </div>
    </div>
    `;
};

export const downloadReconciliationAsPdf = async (reconciliation: Reconciliation, customer: Customer, invoices: Invoice[], t: (key: string) => string): Promise<{success: boolean}> => {
    const htmlContent = getReconciliationHtml(reconciliation, customer, invoices, t);

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    try {
        const canvas = await html2canvas(container.firstChild as HTMLElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        pdf.save(`Mutabakat_${customer.name}_${reconciliation.period}.pdf`);
        return { success: true };
    } catch (error) {
        console.error('Reconciliation PDF generation error:', error);
        return { success: false };
    } finally {
        document.body.removeChild(container);
    }
};
