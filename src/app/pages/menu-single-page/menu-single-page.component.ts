import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MenuSingleService } from './menu-single.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-single-page',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './menu-single-page.component.html'
})
export class MenuSinglePageComponent implements   OnInit, AfterViewInit {

  isLoading: boolean = false;
  packageDetail: any={};
  packageId!: number;
  constructor(
    public service: MenuSingleService,
    private toastr: ToastrService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void {
    // Live TV जस्तै: URL मा ID चेन्ज हुने बित्तिकै यो भित्रको कोड आफैं चल्छ
    this.route.paramMap.subscribe(params => {
      this.packageId = Number(params.get('id'));

      console.log('Live Dynamic ID:', this.packageId);

      // हरेक पटक ID बदलिँदा नयाँ डाटा तान्न यसले मद्दत गर्छ
      this.fetchPackageDetailsById(this.packageId);
    });
  }

  ngAfterViewInit(): void {
    
  }

  fetchPackageDetailsById(id: number) {
    this.isLoading = true;
    this.service.getPackageDetailById(id).subscribe({
      next: (res: any) => {
        this.packageDetail = res.data || {};
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
   
  }
}
















//पेज 'ए' बाट पेज 'बी' मा फ्रेस जम्प हान्दा: जहिले पनि Snapshot नै प्रयोग गर्ने (किनभने यो वन-टाइम लोड हो)।

//पेज 'बी' भित्रै बसेर 'नेक्स्ट प्रोडक्ट', 'प्रिभियस प्रोडक्ट' वा 'रिलेटेड मेनु' मा क्लिक गर्दा: जहिले पनि Subscribe प्रयोग गर्ने
//(किनभने त्यहाँ पेज परिवर्तन नभई केवल आईडी मात्र फेरबदल भइरहन्छ)।

// पेज A (Menu List) बाट पेज B (Naya Page - Menu Detail) मा जम्प गर्नु छ भने: Snapshot प्रयोग गर्ने।
// किनभने अर्कै पेजबाट यो नयाँ पेजमा भर्खरै फ्रेस इन्ट्री (One-time entry)
// भएको हो। पहिलो पटक पेज लोड हुँदा Snapshot ले युआरएलको सही आईडी समातिहाल्छ।

// पेज B मै बसिरहेर (नयाँ पेजमा नगईकन) त्यही पेज भित्रका दायाँ-बायाँका बटन थिचेर फरक-फरक ID
// को डाटा त्यहीँ देखाउनु छ भने: Subscribe प्रयोग गर्ने। किनभने त्यस्तो बेला Angular ले नयाँ पेज खोल्दैन,
//  पुरानै पेजमा युआरएलको ID मात्र फेरिदिन्छ। त्यो फेरिएको ID लाई समात्न ब्याकग्राउन्डमा लाइभ पहरेदार (Subscribe) चाहिन्छ।






// Subscribe प्रयोग गर्दा (पेज B मै बसेर अरू ID हरू पनि त्यहीँ शो गर्नु परेमा)