<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>GoBus Ticket</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            margin: 0;
            padding: 15px;
            background: #f1f5f9;
        }
        .ticket {
            width: 100%;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            overflow: hidden;
            background: #fff;
        }

       
        .header {
            display: block;
            position: relative;
            background: #1E4F88;
            color: white;
            height: 80px;
            padding: 10px 20px;
            overflow: hidden;
            box-sizing: border-box;
        }

       
        .blue-ring {
            position: absolute;
            top: -120px;
            right: 80px;
            width: 280px;
            height: 280px;
            border: 24px solid rgba(96,165,250,.15);
            border-radius: 50%;
            z-index: 1;
        }

       
        .orange-curve {
            position: absolute;
            top: -100px;
            right: 45px;
            width: 220px;
            height: 220px;
            background: #F9A11B;
            border-radius: 50%;
            z-index: 2;
        }

        
        .white-curve {
            position: absolute;
            top: -110px;
            right: -40px;
            width: 250px;
            height: 250px;
            background: #ffffff;
            border-radius: 50%;
            z-index: 3;
        }

        .header-content {
            position: relative;
            z-index: 10;
        }

        .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: 700; 
            letter-spacing: 1.5px;
        }

        .header p {
            margin: 2px 0 0;
            font-size: 10px;
            opacity: .85;
        }

        .ticket-number {
            display: inline-block;
            margin-top: 4px;
            padding: 2px 8px;
            background: rgba(255, 255, 255, .2);
            border-radius: 15px;
            font-size: 9px;
        }

        
        .body {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .left {
            width: 72%;
            padding: 10px 15px; 
            vertical-align: top;
            box-sizing: border-box;
        }

        .right {
            width: 28%;
            background: #f8fafc;
            border-left: 2px dashed #cbd5e1;
            position: relative;
            text-align: center;
            padding: 10px; 
            vertical-align: top;
            overflow: visible;
            box-sizing: border-box;
        }

        
        .cut {
            position: absolute;
            left: -13px; 
            width: 24px;
            height: 24px;
            background: #ffffff;
            border-radius: 50%;
            z-index: 100;
            display: block;
        }

        .cut-top {
            top: 12%;
        }

        .cut-middle {
            top: 50%;
            margin-top: -12px;
        }

        .cut-bottom {
            bottom: 12%;
        }

       
        .ticket-title-area {
            margin-bottom: 8px; 
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 4px;
        }

        .info-title {
            font-size: 9px;
            font-weight: bold;
            color: #94a3b8;
            letter-spacing: 0.5px;
        }

        .main-ticket-label {
            font-size: 16px;
            font-weight: 700; 
            color: #1e293b;
            margin: 0;
        }

        .from-to {
            width: 100%;
            margin-bottom: 8px;
            padding-bottom: 6px;
            border-bottom: 1px solid #f1f5f9;
        }

        .city {
            font-size: 14px;
            font-weight: bold;
            color: #0f172a;
        }

        .arrow {
            color: #fca120;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }

        .grid {
            width: 100%;
        }

        .grid td {
            width: 50%;
            padding: 3px; 
        }

     
        .card {
            background: #fff;
            border: 0.5px solid #e2e8f0; 
            border-radius: 10px;
            padding: 5px 8px; 
        }

        .label {
            font-size: 8.5px;
            color: #64748b;
            font-weight: bold;
            text-transform: uppercase;
        }

        .value {
            font-size: 10.5px;
            font-weight: bold;
            color: #334155;
            margin-top: 1px;
            white-space: nowrap;
            overflow: hidden;
        }

        .bottom-area {
            margin-top: 8px; 
            border-radius: 10px;
            padding: 4px 8px;
        }

        .bottom-table {
            width: 100%;
        }

        .price-label {
            font-size: 8.5px;
            color: #16a34a;
            font-weight: bold;
        }

        .price {
            font-size: 20px;
            font-weight: 700;
            color: #16a34a;
        }

        .badge-container {
            text-align: right;
        }

        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 15px;
            font-size: 8.5px;
            font-weight: bold;
            margin-left: 3px;
        }

        .green {
            background: #dcfce7;
            color: #15803d;
        }

        .blue {
            background: #dbeafe;
            color: #1d4ed8;
        }

        
        .qr img {
            width: 95px; 
            height: 95px;
            padding: 4px;
            background: #fff;
            border: 0.5px solid #e2e8f0; 
            border-radius: 10px;
        }

        .scan {
            font-size: 8px;
            color: #64748b;
            font-weight: bold;
            margin-top: 4px;
            text-transform: uppercase;
        }

        .seat {
            margin-top: 8px;
            background: #fff;
            border: 0.5px solid #e2e8f0; 
            border-radius: 12px;
            padding: 6px;
        }

        .seat-title {
            font-size: 9px;
            color: #94a3b8;
            font-weight: bold;
        }

        .seat-number {
            font-size: 18px;
            font-weight: 700; 
            color: #0f172a;
        }

        
        .footer {
            text-align: center;
            padding: 8px;
            font-size: 9px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
            background: #fff;
        }
    </style>
</head>
<body>

<div class="ticket">

    <div class="header">
        <div class="blue-ring"></div>
        <div class="orange-curve"></div>
        <div class="white-curve"></div>

        <div class="header-content">
            <h1>GOBUS COMPANY</h1>
            <p>Premium Bus Ticket</p>
            <div class="ticket-number">
                Ticket #{{ $ticket->ticket_number }}
            </div>
        </div>
    </div>

    <table class="body">
        <tr>
            <td class="left">
                <div class="ticket-title-area">
                    <div class="info-title">MODERMN : TRAVEL INFO</div>
                    <h2 class="main-ticket-label">BUS TICKET</h2>
                </div>

                <table class="from-to">
                    <tr>
                        <td style="width:40%; padding:0;">
                            <div class="small" style="font-size:9px; color:#94a3b8; font-weight:bold;">FROM</div>
                            <div class="city">{{ $booking->trip->departureStation->name }}</div>
                        </td>
                        <td style="width:20%; padding:0;" class="arrow">→</td>
                        <td style="width:40%; padding:0; text-align:right;">
                            <div class="small" style="font-size:9px; color:#94a3b8; font-weight:bold;">TO</div>
                            <div class="city">{{ $booking->trip->arrivalStation->name }}</div>
                        </td>
                    </tr>
                </table>

                <table class="grid">
                    <tr>
                        <td>
                            <div class="card">
                                <div class="label">Passenger</div>
                                <div class="value">{{ $booking->user->name }}</div>
                            </div>
                        </td>
                        <td>
                            <div class="card">
                                <div class="label">Bus</div>
                                <div class="value">{{ $booking->trip->bus->name ?? 'N/A' }}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="card">
                                <div class="label">Booking No.</div>
                                <div class="value">{{ $booking->booking_number }}</div>
                            </div>
                        </td>
                        <td>
                            <div class="card">
                                <div class="label">Ticket No.</div>
                                <div class="value">{{ $ticket->ticket_number }}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="card">
                                <div class="label">Departure</div>
                                <div class="value">{{ date('Y-m-d H:i', strtotime($booking->trip->departure_time)) }}</div>
                            </div>
                        </td>
                        <td>
                            <div class="card">
                                <div class="label">Arrival</div>
                                <div class="value">{{ date('Y-m-d H:i', strtotime($booking->trip->arrival_time)) }}</div>
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="bottom-area">
                    <table class="bottom-table">
                        <tr>
                            <td>
                                <div class="price-label">TOTAL PRICE</div>
                                <div class="price">{{ number_format($booking->total_price, 2) }}  SYP</div>
                            </td>
                            <td class="badge-container">
                                <span class="badge green">{{ ucfirst($booking->payment_status) }}</span>
                                <span class="badge blue">{{ ucfirst($booking->booking_status) }}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>

            <td class="right">
                <div class="cut cut-top"></div>
                <div class="cut cut-middle"></div>
                <div class="cut cut-bottom"></div>

                <div class="qr">
                    <img src="{{ public_path('storage/'.$ticket->qr_code) }}">
                </div>

                <div class="scan">Scan at boarding gate</div>

                <div class="seat">
                    <div class="seat-title">SEAT</div>
                    <div class="seat-number">
                        {{ $booking->seats->pluck('seat_number')->implode(', ') }}
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <div class="footer">
        Thank you for choosing GoBus 🚍
    </div>
</div>

</body>
</html>