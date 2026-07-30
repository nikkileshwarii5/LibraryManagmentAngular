import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-payments',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit {
    allPayments: any[] = [];
  loading = false;

  searchQuery = '';
  filterStatus = '';

  page = 0;
  rowsPerPage = 10;


totalElements = 0;
totalPages = 0;
 
  filterGateway = '';
  filterType = '';

  selectedPayment: any = null;
  detailsDialogOpen = false;



    // ✅ backend stats
  monthlyRevenue:any = null;
  successCount :any= null;
  pendingCount :any = null;
  failedCount :any = null;

  constructor(private service: PaymentService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPayments();
    this.loadRevenue();
  }

    // ✅ LOAD PAYMENTS
  loadPayments() {
    this.loading = true;

    this.service.getAllPayments(this.page, this.rowsPerPage)
      .subscribe({
        next: (res: any) => {
          this.allPayments = res.content || res;
          this.totalElements = res.totalElements;
          this.totalPages = res.totalPages;
          this.calculateCounts();   // ✅ calculate counts only
          this.loading = false;
           this.cdr.detectChanges();
        },
        error: () => this.loading = false
      });
  }

  // ✅ LOAD REVENUE FROM BACKEND
  loadRevenue() {
    this.service.getMonthlyRevenue().subscribe((res: any) => {
      this.monthlyRevenue = res?.monthlyRevenue || 0;
    });
  }

   // ✅ ONLY COUNTS (light logic, not heavy)
  calculateCounts() {
    this.successCount = this.allPayments.filter(p =>
      p.status === 'SUCCESS' || p.status === 'COMPLETED'
    ).length;

    this.pendingCount = this.allPayments.filter(p =>
      p.status === 'PENDING' || p.status === 'INITIATED'
    ).length;

    this.failedCount = this.allPayments.filter(p =>
      p.status === 'FAILED'
    ).length;
  }

  // ✅ VIEW DETAILS
  // handleViewDetails(row: any) {
  //   this.service.getPaymentById(row.id).subscribe((res: any) => {
  //     this.selectedPayment = res;
  //     this.detailsDialogOpen = true;
  //   });
  // }

  handleViewDetails(payment: any) {
  this.selectedPayment = payment;
  this.detailsDialogOpen = true;
   this.cdr.detectChanges();
  document.body.classList.add('modal-open');
}

closeModal() {
  this.detailsDialogOpen = false;
  this.cdr.detectChanges();
  document.body.classList.remove('modal-open');
}

  // ✅ CANCEL PAYMENT
  handleCancel(row: any) {
    if (confirm('Cancel this payment?')) {
      this.service.cancelPayment(row.id).subscribe(() => {
        this.loadPayments();
      });
    }
  }

  // ✅ RETRY PAYMENT
  handleRetry(row: any) {
    this.service.retryPayment(row.id).subscribe(() => {
      this.loadPayments();
    });
  }

 // ✅ FILTER
get filteredPayments() {
  return this.allPayments.filter(p => {

    const matchSearch =
      !this.searchQuery ||
      p.transactionId?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      p.userName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      p.userEmail?.toLowerCase().includes(this.searchQuery.toLowerCase());

    const matchGateway =
      !this.filterGateway || p.gateway === this.filterGateway;

    // const matchStatus =
    //   !this.filterStatus || p.status === this.filterStatus;

    const matchStatus =
  !this.filterStatus ||
  (this.filterStatus === 'SUCCESS' &&
    (p.status === 'SUCCESS' || p.status === 'COMPLETED')) ||
  p.status === this.filterStatus;

    const matchType =
      !this.filterType || p.paymentType === this.filterType;

    return matchSearch && matchGateway && matchStatus && matchType;
  });
}

  // ✅ STATUS CLASS
getStatusClass(status: string) {
  if (status === 'SUCCESS' || status === 'COMPLETED') return 'success';
  if (status === 'FAILED') return 'danger';
  if (status === 'PENDING') return 'warning';
  if (status === 'PROCESSING') return 'processing';

  return 'secondary';
}

  // ✅ EXPORT CSV
  handleExportCSV() {
    const csvData = this.filteredPayments.map(p => ({
      'Transaction ID': p.transactionId,
      'User': p.userName,
      'Amount': `${p.currency} ${p.amount}`,
      'Gateway': p.gateway,
      'Status': p.status,
      'Date': new Date(p.createdAt).toLocaleDateString()
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'payments.csv';
    a.click();
  }


  clearFilters() {
  this.searchQuery = '';
  this.filterGateway = '';
  this.filterStatus = '';
  this.filterType = '';
}


nextPage() {
  if (this.page < this.totalPages - 1) {
    this.page++;
    this.loadPayments();
  }
}

previousPage() {
  if (this.page > 0) {
    this.page--;
    this.loadPayments();
  }
}

goToPage(pageNumber: number) {
  this.page = pageNumber;
  this.loadPayments();
}

changeRows(event: any) {
  this.rowsPerPage = +event.target.value;
  this.page = 0;
  this.loadPayments();
}

get pages(): number[] {
  return Array(this.totalPages).fill(0).map((_, i) => i);
}


printReceipt() {

  const p = this.selectedPayment;

  const receiptWindow = window.open('', '_blank', 'width=900,height=700');

  if (!receiptWindow) {
    return;
  }

  receiptWindow.document.write(`
  <html>

  <head>

      <title>Payment Receipt</title>

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

      .paid{

          position:absolute;

          right:25px;

          top:25px;

          background:#16a34a;

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

      .status{

          display:inline-block;

          background:#dcfce7;

          color:#15803d;

          padding:6px 16px;

          border-radius:20px;

          font-weight:bold;

      }

      .gateway{

          display:inline-block;

          background:#fff7ed;

          color:#ea580c;

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

      .payment-type{

    display:inline-block;

    background:#fef3c7;

    color:#b45309;

    padding:6px 16px;

    border-radius:20px;

    font-size:13px;

    font-weight:700;

}

    .generated-box{

    margin-top:25px;

    background:#f8fafc;

    border:1px solid #e5e7eb;

    border-radius:10px;

    padding:18px;

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

          <p>Official Payment Receipt</p>

          <div class="paid">PAID</div>

      </div>

      <div class="content">

          <div class="section-title">
              Receipt Information
          </div>

          <table>

              <tr>
                  <td>Receipt No</td>
                  <td>${p.transactionId}</td>
              </tr>

              <tr>
                  <td>Payment ID</td>
                  <td>${p.id}</td>
              </tr>

              <tr>
                  <td>Date</td>
                  <td>${new Date(p.createdAt).toLocaleString()}</td>
              </tr>

          </table>

          <div class="section-title">
              User Details
          </div>

          <table>

              <tr>
                  <td>Name</td>
                  <td>${p.userName}</td>
              </tr>

              <tr>
                  <td>Email</td>
                  <td>${p.userEmail}</td>
              </tr>

          </table>

          <div class="section-title">
              Payment Details
          </div>

          <table>

              <tr>
                  <td>Amount</td>
                  <td class="amount">₹${Number(p.amount).toFixed(2)}</td>
              </tr>

             

              <tr>
    <td>Payment Type</td>
    <td>
        <span class="payment-type">
            ${p.paymentType}
        </span>
    </td>
</tr>

              <tr>
                  <td>Status</td>
                  <td>
                      <span class="status">${p.status}</span>
                  </td>
              </tr>

              <tr>
                  <td>Gateway</td>
                  <td>
                      <span class="gateway">${p.gateway}</span>
                  </td>
              </tr>

              <tr>
                  <td>Gateway Payment ID</td>
                  <td>${p.gatewayPaymentId || '-'}</td>
              </tr>

              <tr>
                  <td>Gateway Order ID</td>
                  <td>${p.gatewayOrderId || '-'}</td>
              </tr>


              <tr>
                  <td>Initiated At</td>
                  <td>${p.initiatedAt ? new Date(p.initiatedAt).toLocaleString() : '-'}</td>
              </tr>

              <tr>
                  <td>Completed At</td>
                  <td>${p.completedAt ? new Date(p.completedAt).toLocaleString() : '-'}</td>
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

              <p>Your payment has been received successfully.</p>

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
