import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SubscriptionPlanService } from '../../../services/subscriptionPlan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-subscriptions',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-subscriptions.html',
  styleUrl: './user-subscriptions.css',
})
export class UserSubscriptions implements OnInit {
    allActiveSubscriptions: any[] = [];
  loading = false;
selectedSubscription: any = null;

detailsDialogOpen = false;
receiptDialogOpen = false;
  searchQuery = '';
filterStatus: string = '';

  page = 0;
  rowsPerPage = 5;
  totalPages = 0;
totalElements = 0;
today = new Date();
pageNumbers: number[] = [];
  renewDialogOpen = false;
  cancelDialogOpen = false;


  isDropdownOpen: boolean = false;

  constructor(private service: SubscriptionPlanService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {

    
  this.loading = true;

  this.service.fetchAllActiveSubscriptions(this.page, this.rowsPerPage)
    .subscribe({
      next: (res: any) => {

         console.log(res);

         
        // 🔥 FIX HERE
        this.allActiveSubscriptions = res?.content || res || [];

       

        this.page = res.pageNumber;
        this.rowsPerPage = res.pageSize;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
  console.log("Total Pages:", this.totalPages);
        this.pageNumbers = Array.from(
          { length: this.totalPages },
          (_, i) => i
        );
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.allActiveSubscriptions = []; // important
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
}
  handleOpenRenewDialog(sub: any) {
    this.selectedSubscription = sub;
    this.renewDialogOpen = true;
    this.cdr.detectChanges();
  }

  handleOpenCancelDialog(sub: any) {
    this.selectedSubscription = sub;
    this.cancelDialogOpen = true;
    this.cdr.detectChanges();
  }

  handleRenew() {
    this.service
      .renewSubscription(this.selectedSubscription.id, this.selectedSubscription.planId)
      .subscribe(() => {
        this.renewDialogOpen = false;
        this.loadSubscriptions();
        this.cdr.detectChanges();
      });
  }

handleCancel() {
  this.service
    .cancelSubscription(
      this.selectedSubscription.id,
      'Cancelled by admin'   // ✅ pass reason
    )
    .subscribe(() => {
      this.cancelDialogOpen = false;
      this.loadSubscriptions();
      this.cdr.detectChanges();
    });
}

  get filteredSubscriptions() {
    return (this.allActiveSubscriptions || []).filter(s => {
      const matchSearch =
        this.searchQuery === '' ||
        s.userName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.userEmail?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.planName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.id.toString().includes(this.searchQuery);

      const matchStatus =
        !this.filterStatus ||
        (s.isActive && this.filterStatus === 'ACTIVE') ||
        (s.isExpired && this.filterStatus === 'EXPIRED') ||
        (s.cancelledAt && this.filterStatus === 'CANCELLED');

      return matchSearch && matchStatus;
    });
  }

  getStatus(sub: any) {
    if (sub.cancelledAt) return 'Cancelled';
    if (sub.isExpired) return 'Expired';
    if (sub.isActive) return 'Active';
    return 'Inactive';
  }

  getStatusClass(sub: any) {
    if (sub.cancelledAt) return 'warning';
    if (sub.isExpired) return 'danger';
    if (sub.isActive) return 'success';
    return 'secondary';
  }

  getDaysRemaining(sub: any) {
    if (!sub.isActive || sub.isExpired) return null;
    return sub.daysRemaining || 0;
  }

  get totalRevenue() {
    return this.allActiveSubscriptions.reduce((sum, s) => sum + (s.price || 0), 0);
  }


  openDetails(subscription: any) {
  this.selectedSubscription = subscription;
  this.detailsDialogOpen = true;
}

closeDetails() {
  this.detailsDialogOpen = false;
}

openReceipt(subscription: any) {
  this.selectedSubscription = subscription;
  this.receiptDialogOpen = true;
}

closeReceipt() {
  this.receiptDialogOpen = false;
}


changePage(page: number) {
  this.page = page;
  this.loadSubscriptions();
}

previousPage() {
  if (this.page > 0) {
    this.page--;
    this.loadSubscriptions();
  }
}

nextPage() {
  if (this.page < this.totalPages - 1) {
    this.page++;
    this.loadSubscriptions();
  }
}

changePageSize(event: any) {
  this.rowsPerPage = +event.target.value;
  this.page = 0;
  this.loadSubscriptions();
}


printSubscriptionReceipt() {

  const s = this.selectedSubscription;

  const receiptWindow = window.open('', '_blank', 'width=900,height=700');

  if (!receiptWindow) {
    return;
  }

  receiptWindow.document.write(`

<html>

<head>

<title>Subscription Receipt</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:#f5f7fb;
    padding:15px;
}

.receipt{
    max-width:800px;
    margin:auto;
    background:#fff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 10px 25px rgba(0,0,0,.15);
}

.header{
    background:linear-gradient(135deg,#2563eb,#1d4ed8);
    color:#fff;
    padding:25px;
    position:relative;
}

.header h1{
    font-size:28px;
}

.header p{
    margin-top:5px;
    opacity:.9;
}

.success{
    position:absolute;
    right:25px;
    top:25px;
    background:#16a34a;
    color:#fff;
    padding:8px 18px;
    border-radius:30px;
    font-size:14px;
    font-weight:bold;
}

.content{
    padding:18px 22px;
}

.section-title{
    font-size:18px;
    font-weight:bold;
    color:#2563eb;
    margin:14px 0 8px;
    border-left:4px solid #2563eb;
    padding-left:10px;
}

table{
    width:100%;
    border-collapse:collapse;
}

td{
    padding:8px 10px;
    border-bottom:1px solid #eee;
}

td:first-child{
    width:35%;
    font-weight:bold;
    color:#555;
}

.amount{
    color:#16a34a;
    font-size:24px;
    font-weight:bold;
}

.plan{
    display:inline-block;
    background:#eff6ff;
    color:#2563eb;
    padding:6px 16px;
    border-radius:20px;
    font-weight:bold;
}

.status{
    display:inline-block;
    background:#dcfce7;
    color:#15803d;
    padding:6px 16px;
    border-radius:20px;
    font-weight:bold;
}

.footer{
    margin-top:20px;
    text-align:center;
    color:#666;
    font-size:14px;
    border-top:1px dashed #ccc;
    padding-top:12px;
}

.note{
    margin-top:10px;
    font-size:12px;
    color:#888;
}
    @page{
    size:A4;
    margin:10mm;
}

@media print{

body{
background:#fff;
padding:0;
}

.receipt{
 box-shadow:none;
        width:100%;
        page-break-inside:avoid;
        break-inside:avoid;
}
         table{
        page-break-inside:avoid;
    }

    .footer{
        page-break-inside:avoid;
    }

}

</style>

</head>

<body>

<div class="receipt">

<div class="header">

<h1>📚 Library Management System</h1>

<p>Official Subscription Receipt</p>

<div class="success">SUCCESS</div>

</div>

<div class="content">

<div class="section-title">
Receipt Information
</div>

<table>

<tr>
<td>Receipt No</td>
<td>SUB-${s.id}</td>
</tr>

<tr>
<td>Subscription ID</td>
<td>${s.id}</td>
</tr>

<tr>
<td>Receipt Date</td>
<td>${new Date(s.createdAt).toLocaleString()}</td>
</tr>

</table>

<div class="section-title">
Subscriber Details
</div>

<table>

<tr>
<td>Name</td>
<td>${s.userName}</td>
</tr>

<tr>
<td>Email</td>
<td>${s.userEmail}</td>
</tr>

</table>

<div class="section-title">
Subscription Details
</div>

<table>

<tr>
<td>Plan</td>
<td>
<span class="plan">
${s.planName}
</span>
</td>
</tr>

<tr>
<td>Amount Paid</td>
<td class="amount">
₹${Number(s.price).toFixed(2)}
</td>
</tr>

<tr>
<td>Status</td>
<td>
<span class="status">
SUCCESS
</span>
</td>
</tr>

<tr>
<td>Start Date</td>
<td>${new Date(s.startDate).toLocaleDateString()}</td>
</tr>

<tr>
<td>Valid Till</td>
<td>${new Date(s.endDate).toLocaleDateString()}</td>
</tr>

<tr>
<td>Auto Renew</td>
<td>${s.autoRenew ? 'Yes' : 'No'}</td>
</tr>

</table>

<div class="section-title">
Generated Information
</div>

<table>

<tr>
<td>Generated By</td>
<td>Library Management System - Admin Portal</td>
</tr>

<tr>
<td>Generated On</td>
<td>${new Date().toLocaleString()}</td>
</tr>

</table>

<div class="footer">

<h3>Thank You!</h3>

<p>Your subscription has been activated successfully.</p>

<div class="note">
This is a computer-generated receipt. No signature is required.
</div>

</div>

</div>

</div>

<script>

window.onload=function(){

window.print();

window.onafterprint=function(){

window.close();

}

}

</script>

</body>

</html>

`);

  receiptWindow.document.close();

}
}


