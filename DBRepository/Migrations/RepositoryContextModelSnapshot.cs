﻿// <auto-generated />
using DBRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Models.Enum;
using System;

namespace DBRepository.Migrations
{
    [DbContext(typeof(RepositoryContext))]
    partial class RepositoryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Balance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("BitcoinBalance");

                    b.Property<string>("BitcoinWallet");

                    b.Property<double>("DefimaBalance");

                    b.Property<double>("USDBalance");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Balance");
                });

            modelBuilder.Entity("Models.BalanceHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Amount");

                    b.Property<double>("Balance");

                    b.Property<DateTime>("DateTransaction");

                    b.Property<DateTime>("Time");

                    b.Property<int>("TypeHistory");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("BalanceHistory");
                });

            modelBuilder.Entity("Models.ConfirmEmail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("TimeConfirm");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("ConfirmEmail");
                });

            modelBuilder.Entity("Models.CurrentSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("IP");

                    b.Property<DateTime>("LoginTime");

                    b.Property<string>("Token")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CurrentSession");
                });

            modelBuilder.Entity("Models.EmailAddres", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Email");
                });

            modelBuilder.Entity("Models.ForgotPassword", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CountAttempt");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<DateTime>("TimeForgot");

                    b.Property<int>("UserId");

                    b.Property<string>("Username")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("ForgotPassword");
                });

            modelBuilder.Entity("Models.Investment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AddCash");

                    b.Property<double>("CurrentCommission");

                    b.Property<DateTime>("DateInvestment");

                    b.Property<bool>("IsFullInvest");

                    b.Property<double>("LastCommission");

                    b.Property<double>("Profit");

                    b.Property<double>("TotalCommission");

                    b.Property<int>("TypeInvest");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Investment");
                });

            modelBuilder.Entity("Models.LoginHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Country");

                    b.Property<string>("IP")
                        .IsRequired();

                    b.Property<DateTime>("LoginTime");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("LoginHistory");
                });

            modelBuilder.Entity("Models.MainPage", b =>
                {
                    b.Property<string>("Component")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Header");

                    b.Property<byte[]>("Image");

                    b.Property<string>("ImageName");

                    b.Property<string>("Link1");

                    b.Property<string>("Link2");

                    b.Property<string>("Link3");

                    b.Property<string>("Name1");

                    b.Property<string>("Name2");

                    b.Property<string>("Name3");

                    b.Property<byte[]>("Picture1");

                    b.Property<string>("Picture1Name");

                    b.Property<byte[]>("Picture2");

                    b.Property<string>("Picture2Name");

                    b.Property<byte[]>("Picture3");

                    b.Property<string>("Picture3Name");

                    b.Property<string>("Question1Header");

                    b.Property<string>("Question1Text");

                    b.Property<string>("Question2Header");

                    b.Property<string>("Question2Text");

                    b.Property<string>("Question3Header");

                    b.Property<string>("Question3Text");

                    b.Property<string>("SubHeader");

                    b.Property<string>("Text");

                    b.Property<string>("Title1");

                    b.Property<string>("Title2");

                    b.Property<string>("Title3");

                    b.HasKey("Component");

                    b.ToTable("MainPage");
                });

            modelBuilder.Entity("Models.MarketFiles", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Component")
                        .IsRequired();

                    b.Property<byte[]>("Content");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("MarketFiles");
                });

            modelBuilder.Entity("Models.News", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Header")
                        .IsRequired();

                    b.Property<DateTime>("LastChangeDate");

                    b.HasKey("Id");

                    b.ToTable("News");
                });

            modelBuilder.Entity("Models.Rate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("BTC_USD");

                    b.Property<double>("USD_DET");

                    b.HasKey("Id");

                    b.ToTable("Rate");
                });

            modelBuilder.Entity("Models.TypeCommission", b =>
                {
                    b.Property<int>("Level")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Value");

                    b.HasKey("Level");

                    b.ToTable("TypeCommission");
                });

            modelBuilder.Entity("Models.TypeInvestment", b =>
                {
                    b.Property<int>("Type");

                    b.Property<double>("Persent");

                    b.HasKey("Type");

                    b.ToTable("TypeInvestment");
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adress");

                    b.Property<DateTime>("BDay");

                    b.Property<string>("Country");

                    b.Property<DateTime>("DateCreate");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("ErrorDiscard");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsAdmin");

                    b.Property<bool>("IsBlock");

                    b.Property<bool>("IsDiscard");

                    b.Property<bool>("IsFogotPassword");

                    b.Property<bool>("IsKYC");

                    b.Property<bool>("IsReInvest");

                    b.Property<bool>("IsShowInfo");

                    b.Property<bool>("IsSuper");

                    b.Property<bool>("IsVerified");

                    b.Property<string>("LastName");

                    b.Property<int?>("ParentId");

                    b.Property<byte[]>("PassportPicture");

                    b.Property<string>("PassportPictureName");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Phone");

                    b.Property<byte[]>("ProofPicture");

                    b.Property<string>("ProofPictureName");

                    b.Property<byte[]>("SelfiPicture");

                    b.Property<string>("SelfiPictureName");

                    b.Property<int?>("UserId");

                    b.Property<string>("Username")
                        .IsRequired();

                    b.Property<int>("Zip");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserInfo");
                });

            modelBuilder.Entity("Models.Balance", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithOne("Balance")
                        .HasForeignKey("Models.Balance", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.BalanceHistory", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithMany("BalanceHistories")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.ConfirmEmail", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithOne("ConfirmEmail")
                        .HasForeignKey("Models.ConfirmEmail", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.CurrentSession", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithMany("CurrentSessions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.ForgotPassword", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithOne("ForgotPassword")
                        .HasForeignKey("Models.ForgotPassword", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.Investment", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithMany("Investments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.LoginHistory", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithMany("LoginHistories")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.HasOne("Models.User")
                        .WithMany("Children")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
