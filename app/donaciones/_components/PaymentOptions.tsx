import { FaPaypal } from 'react-icons/fa';
import {
  IoLogoWhatsapp,
  IoShieldCheckmarkOutline,
  IoWalletOutline,
} from 'react-icons/io5';
import { Button } from '@/app/components/shared/ui/Button';
import { churchInfo, whatsappHref } from '@/app/constants/church';

interface PaymentOptionsProps {
  /** Monto válido o null si aún no hay uno */
  amount: number | null;
  purposeTitle: string;
}

const optionClassName =
  'flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 md:p-8';

/**
 * Métodos de pago. El sitio no procesa pagos: PayPal y el banco manejan
 * la transacción, y WhatsApp sirve para avisar y registrar la donación.
 */
export const PaymentOptions = ({
  amount,
  purposeTitle,
}: PaymentOptionsProps) => {
  const amountText = amount
    ? `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    : '';
  const notifyMessage = `Hola, acabo de realizar una donación de ${amountText} para ${purposeTitle}. Adjunto el comprobante.`;

  return (
    <div className="mt-12">
      <h3 className="mb-6 font-playfair text-3xl font-bold text-navy-900">
        Métodos de Pago
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className={optionClassName}>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#003087] text-3xl text-white">
              <FaPaypal />
            </span>
            <div>
              <h4 className="text-2xl font-semibold text-navy-900">PayPal</h4>
              <p className="text-xl text-navy-600">
                Pago con tarjeta o cuenta PayPal
              </p>
            </div>
          </div>
          {amount ? (
            <Button
              href={churchInfo.donations.paypalUrl}
              external
              className="mt-auto w-full bg-none! bg-[#0070ba] hover:bg-[#005ea6]"
            >
              Donar {amountText} con PayPal
            </Button>
          ) : (
            <Button disabled className="mt-auto w-full">
              Elige un monto
            </Button>
          )}
        </div>

        <div className={optionClassName}>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-3xl text-white">
              <IoWalletOutline />
            </span>
            <div>
              <h4 className="text-2xl font-semibold text-navy-900">
                Transferencia Bancaria
              </h4>
              <p className="text-xl text-navy-600">
                Depósito directo a nuestra cuenta
              </p>
            </div>
          </div>
          <Button
            href="#datos-bancarios"
            variant="navy"
            className="mt-auto w-full"
          >
            Ver Datos Bancarios
          </Button>
        </div>
      </div>

      {amount && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-gold-50 p-6 text-center">
          <p className="text-xl text-navy-700">
            ¿Ya realizaste tu donación? Avísanos para registrarla.
          </p>
          <Button
            href={whatsappHref(notifyMessage)}
            external
            variant="outline"
            icon={<IoLogoWhatsapp />}
          >
            Enviar comprobante por WhatsApp
          </Button>
        </div>
      )}

      <div className="mt-6 flex items-start gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-6">
        <IoShieldCheckmarkOutline className="shrink-0 text-4xl text-navy-700" />
        <div>
          <h4 className="mb-1 text-2xl font-semibold text-navy-900">
            Donación Segura
          </h4>
          <p className="text-xl leading-relaxed text-navy-700">
            Este sitio no recibe ni guarda datos de pago. Las transacciones se
            realizan directamente en PayPal o en tu banco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
