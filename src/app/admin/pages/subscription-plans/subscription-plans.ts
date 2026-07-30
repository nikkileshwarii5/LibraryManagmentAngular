import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-subscription-plans',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './subscription-plans.html',
  styleUrl: './subscription-plans.css',
})
export class SubscriptionPlans  implements OnInit  {
  allPlans: any[] = [];
  loading = false;
  dialogOpen = false;
  editingPlan: any = null;
  isSaving = false;
  
formData = this.getEmptyForm();

getEmptyForm() {
  return {
    planCode: '',
    name: '',
    description: '',
    price: 0,
    currency: 'INR',
    durationDays: 30,
    maxBooksAllowed: 5,
    maxDaysPerBook: 14,
    displayOrder: 0,
    isActive: true,
    isFeatured: false,
    badgeText: '',
    adminNotes: ''
  };
}



  constructor(private service: SubscriptionService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPlans();
  }

loadPlans() {
  this.loading = true;

  this.service.getAllPlans().subscribe({
    next: (res: any) => {
      this.allPlans = res.content || res;
      this.loading = false;

      this.cdr.detectChanges();   // 🔥 IMPORTANT
    },
    error: () => {
      this.loading = false;
      this.cdr.detectChanges();   // 🔥 IMPORTANT
    }
  });
}

  openDialog(plan?: any) {
  this.dialogOpen = true;

  if (plan) {
    this.editingPlan = plan;
    this.formData = { ...plan };
  } else {
    this.editingPlan = null;
    this.formData = this.getEmptyForm();
  }
}


closeDialog() {
  this.dialogOpen = false;
}

/* =========================
   SAVE (CREATE + UPDATE)
========================= */
savePlan() {
  if (this.isSaving) return;

  this.isSaving = true;

  const request = this.editingPlan
    ? this.service.updatePlan(this.editingPlan.id, this.formData)
    : this.service.createPlan(this.formData);

  request.subscribe({
    next: () => {
      this.loadPlans();
      this.closeDialog();
      this.isSaving = false;
    },
    error: (err) => {
      console.error(err);
      this.isSaving = false;
    }
  });
}
  handleDelete(plan: any) {
    if (confirm(`Delete "${plan.name}"?`)) {
      this.service.deletePlan(plan.id).subscribe(() => {
        this.loadPlans();
      });
    }
  }


  getBillingText(days: number): string {
  if (days === 30) return '/ mo';
  if (days === 90) return '/ 3 mo';
  if (days === 365) return '/ yr';
  return '';
}


get totalPlans() {
  return this.allPlans?.length || 0;
}

get activePlans() {
  return this.allPlans?.filter(p => p.isActive).length || 0;
}

get featuredPlans() {
  return this.allPlans?.filter(p => p.isFeatured).length || 0;
}

get avgPriceValue() {
  if (!this.allPlans?.length) return 0;
  return (
    this.allPlans.reduce((sum, p) => sum + p.price, 0) /
    this.allPlans.length
  ).toFixed(2);
}
}
