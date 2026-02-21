import OutCall "http-outcalls/outcall";

actor {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func getInstagramDownloadLink(igUrl : Text) : async Text {
    await OutCall.httpGetRequest(
      "https://www.instagram.com/p/" # igUrl # "/?__a=1",
      [],
      transform,
    );
  };

  public shared ({ caller }) func getFacebookDownloadLink(fbUrl : Text) : async Text {
    await OutCall.httpGetRequest(
      "https://graph.facebook.com/v11.0/" # fbUrl # "?fields=source",
      [],
      transform,
    );
  };
};
