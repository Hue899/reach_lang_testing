"reach 0.1";

const T_onERC721Received = Fun(
  [ Address, // operator
    Address, // from
    UInt256, // tokenId
    BytesDyn // data
  ],
  Bytes(4) 
);

// Magic value specified in EIP721
const onERC721Received_selector = Bytes.fromHex("0x150b7a02");

export const rch_ERC721_TokenReceiver = Reach.App(() => {
  const O = Participant("Owner", { sel: Bytes(4) });
  const E = Events({ GotAToken: [Address, Address, UInt256, BytesDyn] });
  const A = API({ onERC721Received: T_onERC721Received });
  init();

  O.publish();
  const _ =
    parallelReduce(null)
    .while(true)
    .invariant(true)
    .api_(A.onERC721Received, (operator, from_, tokenId, data) => {
      return [k => {
        E.GotAToken(operator, from_, tokenId, data);
        k(onERC721Received_selector);
      }];
    })

  commit();
});

// Not a real ERC721!
// Just a dummy to simulate how an ERC721 would call onERC721Received.
export const rch_ERC721 = Reach.App(() => {
  const O = Participant("Owner", { sel: Bytes(4), zeroAddr: Address });
  const A = API({ mint: Fun([Contract, UInt256, BytesDyn], Null) });
  init();

  O.only(() => { const zeroAddr = declassify(interact.zeroAddr); });
  O.publish(zeroAddr);
  const _ =
    parallelReduce(null)
    .while(true)
    .invariant(true)
    .api_(A.mint, (to, tokenId, data) => {
      return [k => {
        const recipient = remote(to, { onERC721Received: T_onERC721Received });
        const result = recipient.onERC721Received(O, zeroAddr, tokenId, data);
        enforce(result == onERC721Received_selector);
        k(null);
      }];
    });
    commit();
});
