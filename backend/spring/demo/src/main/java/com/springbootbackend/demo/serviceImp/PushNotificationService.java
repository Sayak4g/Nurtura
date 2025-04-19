package com.springbootbackend.demo.serviceImp;

import com.springbootbackend.demo.model.PushSubscription;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class PushNotificationService {
    @Value("${vapid.public.key}")
    private String publicKey;

    @Value("${vapid.private.key}")
    private String privateKey;

    public void sendNotification(PushSubscription subscription, String message) throws Exception {
        Notification notification = new Notification(
                subscription.getEndpoint(),
                subscription.getKeys().getP256dh(),
                subscription.getKeys().getAuth(),
                message
        );

        PushService pushService = new PushService()
                .setPublicKey(publicKey)
                .setPrivateKey(privateKey)
                .setSubject("mailto:your@email.com");

        pushService.send(notification);
    }
}
