import { X } from "lucide-react";
import {QRCodeSVG} from "qrcode.react";

const QRModal = ({url, onClose}) => {
    return <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-[90%] max-w-md shadow">
            <div className="flex justify-between font-bold text-2xl border-b border-gray-300 shadow py-4 px-5">
                QR Code
                <button
                    className="text-gray-500 hover:text-black cursor-pointer"
                    onClick={onClose}
                >
                    <X size={18} />
                </button>
            </div>
            <div className="py-25 flex justify-center items-center">
                <QRCodeSVG value={url} size={150} />
            </div>
        </div>
    </div>
}

export default QRModal;