import Image from 'next/image'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div>
            {ensAvatar && <Image alt="ENS Avatar" src={ensAvatar} width={20} height={20} />}
            {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
            <button onClick={() => disconnect()}>Disconnect</button>
        </div>
    )
}
