import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { PackageMenuService } from './package-menu.service';

// PDF डाउनलोडका लागि आवश्यक लाइब्रेरीहरू यहाँ थपिएका छन्
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-package-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './package-menu.component.html',
})
export class PackageMenuComponent implements OnInit, AfterViewInit {
  public baseurl = environment.apiBaseUrl;
  isLoading: boolean = false;
  
  packageName: string = ''; // प्याकेजको नाम स्टोर गर्न
  groupedMenuCategories: any[] = []; // ग्रुप गरिएको क्याटेगोरी र आइटम लिस्ट
  packageId!: number;

  // HTML को निश्चित भाग (मेनु एरिया) समात्नका लागि ViewChild थपिएको छ
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(
    public service: PackageMenuService,
    private toastr: ToastrService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.packageId = Number(params.get('id'));
      this.fetchPackageMenuById(this.packageId);
    });
  }

  ngAfterViewInit(): void {}

  fetchPackageMenuById(id: number) {
    this.isLoading = true;
    this.service.getPackageMenuById(id).subscribe({
      next: (res: any) => {
        const rawData = res.data || res;
 
        if (rawData && rawData.length > 0) {
          // १. पहिलो अब्जेक्टबाट प्याकेजको नाम लिने
          this.packageName = rawData[0].packageName;
          console.log(this.packageName, 'this.packageName')
          
          // २. डेटालाई 'categoryName' र 'chooseCount' अनुसार ग्रुप गर्ने (तपाईंको साविककै लजिक)
          const groups: { [key: string]: { categoryName: string, chooseCount: number, items: any[] } } = {};
          
          rawData.forEach((item: any) => {
            if (!groups[item.categoryName]) {
              groups[item.categoryName] = {
                categoryName: item.categoryName,
                chooseCount: item.chooseCount,
                items: []
              };
            }
            groups[item.categoryName].items.push(item);
          });
          
          // अब्जेक्टलाई लुप चलाउन सजिलो हुने गरी एरेमा बदल्ने
          this.groupedMenuCategories = Object.values(groups);
        } else {
          this.groupedMenuCategories = [];
          this.packageName = 'Menu Detail';
        }
        
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        this.toastr.error('मेनु लोड गर्न सकिएन ।', 'Error');
      }
    });
  }

  // === PDF डाउनलोड गर्ने फङ्सन (नयाँ थपिएको) ===
  downloadPDF() {
    const element = this.pdfContent.nativeElement;
   this.toastr.info('Preparing your PDF, please wait...', 'Downloading');

    html2canvas(element, {
      useCORS: true, 
      scale: 2 // Quality एकदम क्लियर र High Reso राख्न
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; 
      const pageHeight = 297; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${this.packageName.replace(/\s+/g, '_')}_Menu.pdf`);
      this.toastr.success('मेनु डाउनलोड भयो ।', 'Success');
    });
  }
}