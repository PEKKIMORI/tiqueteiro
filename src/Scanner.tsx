import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

function Scanner() {

    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 700,
                height: 700,
            },
            fps: 5,
        }, true)
        
        scanner.render(success, error);
    
        function success(result: any) {
            scanner.clear();
            setScanResult(result);
        }
    
        function error(err: any) {
            console.warn(err);
        }
    },[]);

    return (
        <div>
            { scanResult 
            ?   <div>Success: {scanResult}</div>
            :   <div id='reader'></div>
            }

        </div>
    );
};

export default Scanner;


